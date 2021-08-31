from __future__ import annotations
# GPX parsing library
from gpxpy.gpx import (
    GPXTrackSegment, GPXTrack, MinimumMaximum, MovingData, GPXBounds,
    UphillDownhill
)
from gpxpy.geo import Location
# typing
from typing import Dict, Union, List
# Models
from .db import db
from .trackpoint import TrackPoint
from .user import User

# # Generic Variable for Route class
# RouteType = TypeVar('RouteType', bound='Route')


class Track(db.Model):
    """
    id: Integer, primary_key=True
    title: String(50), nullable=False
    distance: Float, nullable=False
    ascent: Float
    descent: Float
    created_at: DateTime, default=now
    updated_at: DateTime, default=now, onupdate=now
    +relationships: user, track_points, workouts
    &instance_methods: to_dict, to_simple_dict
    """

    __tablename__ = "tracks"
    # Primary Columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    distance = db.Column(db.Float, nullable=False)
    ascent = db.Column(db.Float)
    descent = db.Column(db.Float)
    # todo Add polyline for tile in routes index
    center_latitude = db.Column(db.Float)
    center_longitude = db.Column(db.Float)
    min_latitude = db.Column(db.Float)
    min_longitude = db.Column(db.Float)
    max_latitude = db.Column(db.Float)
    max_longitude = db.Column(db.Float)
    min_elevation = db.Column(db.Float)
    max_elevation = db.Column(db.Float)

    created_at = db.Column(
        db.DateTime(timezone=True),
        server_default=db.func.now())

    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=db.func.now(),
        onupdate=db.func.now())

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # Relationships
    user = db.relationship("User", back_populates="tracks")
    track_points = db.relationship(
        "TrackPoint", back_populates="track", passive_deletes=True)
    workouts = db.relationship("Workout", back_populates="track")

    def to_dict(self) -> Dict[str, Union[int, float, str, List[TrackPoint]]]:
        """
        id, title, distance, ascent, descent, [track_points.to_dict()]
        """
        return {
            "id": self.id,
            "title": self.title,
            "distance": self.distance,
            "ascent": self.ascent,
            "descent": self.descent,
            "track_points": [
                track_point.to_dict() for track_point in self.track_points
            ]
        }

    def to_simple_dict(self) -> Dict[str, Union[int, float, str]]:
        """
        id, title, distance, ascent, descent
        """
        return {
            "id": self.id,
            "title": self.title,
            "distance": self.distance,
            "ascent": self.ascent,
            "descent": self.descent
        }

    @classmethod
    def create_track_from_gpx_track(
            cls, track: GPXTrack, title: str, user_id: int) -> Track:
        """
        Create a new Track and coresponding TrackPoint objects from a GPXTrack
        - Removes empty trackpoints
        - Calculates ascent/descent, min/max elevation, min/max +
          center latitude/longitude
        """
        track.remove_empty()

        bounds: GPXBounds = track.get_bounds()
        center: Location = track.get_center()
        min_max_elevation: MinimumMaximum = track.get_elevation_extremes()
        moving_data: MovingData = track.get_moving_data()
        uphill_downhill: UphillDownhill = track.get_uphill_downhill()

        new_track: Track = cls(
            title=title,
            center_latitude=center.latitude,
            center_longitude=center.longitude,
            min_latitude=bounds.min_latitude,
            min_longitude=bounds.min_longitude,
            max_latitude=bounds.max_latitude,
            max_longitude=bounds.max_longitude,
            distance=moving_data.moving_distance,
            min_elevation=min_max_elevation.minimum,
            max_elevation=min_max_elevation.maximum,
            ascent=uphill_downhill.uphill,
            descent=uphill_downhill.downhill,
            user_id=user_id
        )

        parsed_track_points: Union[List[TrackPoint], List] = []
        segment: GPXTrackSegment
        for segment in track.segments:
            parsed_track_points = TrackPoint.create_track_points_from_gpx_segment(
                segment)
            new_track.track_points.extend(parsed_track_points)
        return new_track