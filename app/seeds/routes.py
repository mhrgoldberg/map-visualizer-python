from app.models import db, Route

# Adds a demo user, you can add other users here if you want


def seed_routes():
    # TODO: add trackpoints into route in seeder
    first_route = Route(title="First Route", )

    db.session.add(first_route)

    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE routes;')
    db.session.commit()
