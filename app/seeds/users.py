from app.utility import SportOptions, GenderOptions
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():
    demo = User(
        username='demo',
        email='demo@demo.com',
        password='password',
        age=44,
        gender=GenderOptions.Other,
        primary_sport=SportOptions.Hike,
    )

    nirvana = User(
        username='nirvana',
        email='nirvana@nirvana.com',
        password='password',
        age=30,
        gender=GenderOptions.Male,
        primary_sport=SportOptions.MultiSport,
    )

    db.session.add(demo)
    db.session.add(nirvana)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
