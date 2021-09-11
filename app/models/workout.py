from __future__ import annotations
# typings
from typing import TextIO
# db
from .db import db
from .track import Track
# gpx
from gpxpy import parse
from gpxpy.gpx import GPXTrack, GPXRoute, MovingData


class Workout(db.Model):
    """
    id: Integer, primary_key=True
    title: String(50)
    description: Text
    distance: Float # Miles
    duration: Integer # Seconds
    created_at: DateTime, default=now
    updated_at: DateTime, default=now, onupdate=now
    +relationships: route, user
    &class_methods: to_dict
    """

    __tablename__ = "workouts"

    # Primary Columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    duration = db.Column(db.Integer, nullable=False)  # Seconds
    moving_time = db.Column(db.Float)
    stopped_time = db.Column(db.Float)
    moving_distance = db.Column(db.Float)
    max_speed = db.Column(db.Float)
    created_at = db.Column(
        db.DateTime(timezone=True),
        server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=db.func.now(),
        onupdate=db.func.now())

    # Foreign Keys
    track_id = db.Column(db.Integer, db.ForeignKey("tracks.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Relationships
    track = db.relationship("Track", back_populates="workouts")
    user = db.relationship("User", back_populates="workouts")

    def to_dict(self):
        """
        id, title, description, distance, duration, track.to_simple_dict()
        """
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "distance": self.distance,
            "duration": self.duration,
            "track": self.track.to_simple_dict()
        }

    @classmethod
    def create_workout_from_gpx(
            cls, file: TextIO, title: str, user_id: int) -> Workout:
        """
        Parses gpx file using gpxpy parse function and creates Route object
        of related Trackpoint objects.
        """
        gpx_route: GPXRoute = parse(file)
        # initialize new route instance
        new_workout = cls(title=title, user_id=user_id)

        track: GPXTrack
        for track in gpx_route.tracks:
            # remove empty datapoints
            track.remove_empty()
            moving_data: MovingData = track.get_moving_data()

            new_workout.duration = track.get_duration()
            new_workout.moving_time = moving_data.moving_time
            new_workout.stopped_time = moving_data.stopped_time
            new_workout.moving_distance = moving_data.moving_distance
            new_workout.max_speed = moving_data.max_speed

            new_track = Track.create_track_from_gpx_track(
                track, title=f"{title} track", user_id=user_id)

            new_workout.track = new_track
            db.session.add(new_workout)
            db.session.commit()
        return new_workout
