"""switch route table to track and update fields

Revision ID: e71b735ce5d6
Revises: d51e79953370
Create Date: 2021-07-19 16:54:50.480764

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'e71b735ce5d6'
down_revision = 'd51e79953370'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tracks',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('title', sa.String(length=50), nullable=False),
                    sa.Column('distance', sa.Float(), nullable=False),
                    sa.Column('ascent', sa.Float(), nullable=True),
                    sa.Column('descent', sa.Float(), nullable=True),
                    sa.Column('center_latitude', sa.Float(), nullable=True),
                    sa.Column('center_longitude', sa.Float(), nullable=True),
                    sa.Column('min_latitude', sa.Float(), nullable=True),
                    sa.Column('min_longitude', sa.Float(), nullable=True),
                    sa.Column('max_latitude', sa.Float(), nullable=True),
                    sa.Column('max_longitude', sa.Float(), nullable=True),
                    sa.Column('min_elevation', sa.Float(), nullable=True),
                    sa.Column('created_at', sa.DateTime(timezone=True),
                              server_default=sa.text('now()'), nullable=True),
                    sa.Column('updated_at', sa.DateTime(timezone=True),
                              server_default=sa.text('now()'), nullable=True),
                    sa.Column('user_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    op.add_column('track_points', sa.Column(
        'cadence', sa.Integer(), nullable=True))
    op.add_column('track_points', sa.Column(
        'heart_rate', sa.Integer(), nullable=True))
    op.add_column('track_points', sa.Column(
        'speed', sa.Float(), nullable=False))
    op.add_column('track_points', sa.Column(
        'temperature', sa.Integer(), nullable=True))
    op.add_column('track_points', sa.Column(
        'time', sa.DateTime(), nullable=True))
    op.add_column('track_points', sa.Column(
        'track_id', sa.Integer(), nullable=False))
    op.drop_constraint('track_points_route_id_fkey',
                       'track_points', type_='foreignkey')
    op.create_foreign_key(None, 'track_points', 'tracks', [
                          'track_id'], ['id'], ondelete='CASCADE')
    op.drop_column('track_points', 'route_id')
    op.add_column('workouts', sa.Column(
        'max_speed', sa.Float(), nullable=True))
    op.add_column('workouts', sa.Column(
        'moving_distance', sa.Float(), nullable=True))
    op.add_column('workouts', sa.Column(
        'moving_time', sa.Float(), nullable=True))
    op.add_column('workouts', sa.Column(
        'stopped_time', sa.Float(), nullable=True))
    op.add_column('workouts', sa.Column(
        'track_id', sa.Integer(), nullable=True))
    op.drop_constraint('workouts_route_id_fkey',
                       'workouts', type_='foreignkey')
    op.create_foreign_key(None, 'workouts', 'tracks', ['track_id'], ['id'])
    op.drop_column('workouts', 'distance')
    op.drop_column('workouts', 'route_id')
    op.drop_table('routes')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('workouts', sa.Column(
        'route_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('workouts', sa.Column('distance', postgresql.DOUBLE_PRECISION(
        precision=53), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'workouts', type_='foreignkey')
    op.create_foreign_key('workouts_route_id_fkey',
                          'workouts', 'routes', ['route_id'], ['id'])
    op.drop_column('workouts', 'track_id')
    op.drop_column('workouts', 'stopped_time')
    op.drop_column('workouts', 'moving_time')
    op.drop_column('workouts', 'moving_distance')
    op.drop_column('workouts', 'max_speed')
    op.add_column('track_points', sa.Column(
        'route_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'track_points', type_='foreignkey')
    op.create_foreign_key('track_points_route_id_fkey', 'track_points', 'routes', [
                          'route_id'], ['id'], ondelete='CASCADE')
    op.drop_column('track_points', 'track_id')
    op.drop_column('track_points', 'time')
    op.drop_column('track_points', 'temperature')
    op.drop_column('track_points', 'speed')
    op.drop_column('track_points', 'heart_rate')
    op.drop_column('track_points', 'cadence')
    op.create_table('routes',
                    sa.Column('id', sa.INTEGER(),
                              autoincrement=True, nullable=False),
                    sa.Column('title', sa.VARCHAR(length=50),
                              autoincrement=False, nullable=False),
                    sa.Column('distance', postgresql.DOUBLE_PRECISION(
                        precision=53), autoincrement=False, nullable=False),
                    sa.Column('ascent', postgresql.DOUBLE_PRECISION(
                        precision=53), autoincrement=False, nullable=True),
                    sa.Column('descent', postgresql.DOUBLE_PRECISION(
                        precision=53), autoincrement=False, nullable=True),
                    sa.Column('created_at', postgresql.TIMESTAMP(timezone=True),
                              server_default=sa.text('now()'), autoincrement=False, nullable=True),
                    sa.Column('updated_at', postgresql.TIMESTAMP(timezone=True),
                              server_default=sa.text('now()'), autoincrement=False, nullable=True),
                    sa.Column('user_id', sa.INTEGER(),
                              autoincrement=False, nullable=True),
                    sa.ForeignKeyConstraint(
                        ['user_id'], ['users.id'], name='routes_user_id_fkey'),
                    sa.PrimaryKeyConstraint('id', name='routes_pkey')
                    )

    # ### end Alembic commands ###