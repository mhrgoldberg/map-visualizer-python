import os
from app.models import db, Workout, Track, User
from typing import TextIO


def seed_workouts():
    base_dir = os.path.dirname(__file__)
    # Read GPX files from the 'gpx_files' directory
    run_1: TextIO = open(os.path.join(base_dir, 'gpx_files', 'run_1.gpx'))
    run_2: TextIO = open(os.path.join(base_dir, 'gpx_files', 'boulder.gpx'))

    # Find a user
    demo_user = User.query.filter_by(username='demo').first()

    # Create workout objects
    workout_1 = Workout.create_workout_from_gpx(
        run_1, "First Run", demo_user.id)
    track_1 = Track.create_track_from_gpx_track(
        run_2, "Boulder Skyline", demo_user.id)

    # Commit the session
    db.session.add(workout_1)
    db.session.add(track_1)
    db.session.commit()


def undo_workouts():
    db.session.execute(
        'TRUNCATE track_points, tracks, workouts RESTART IDENTITY;')
    db.session.commit()
