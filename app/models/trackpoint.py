from __future__ import annotations

import polyline
from typing import Union, List, Tuple
from gpxpy.gpx import GPXTrackSegment, GPXTrackPoint
from .db import db


class TrackPoint(db.Model):
    """
    id: Integer, primary_key=True
    time: DateTime, nullable=False
    latitude: Float, nullable=False
    longitude: Float, nullable=False
    elevation: Float
    heart_rate = Integer
    temperature = Integer
    cadence = Integer

    +relationships: route
    &instance_methods: to_dict(), to_simple_dict()
    """
    __tablename__ = "track_points"

    # Primary Columns
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    speed = db.Column(db.Float, nullable=False)
    elevation = db.Column(db.Float)
    heart_rate = db.Column(db.Integer)
    temperature = db.Column(db.Integer)
    cadence = db.Column(db.Integer)

    # Foreign Keys
    track_id = db.Column(db.Integer, db.ForeignKey(
        "tracks.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    track = db.relationship("Track", back_populates="track_points")

    def to_dict(self):
        """
        id, latitude, longitude, elevation
        """
        return {
            "id": self.id,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "elevation": self.elevation,
            "heart_rate": self.heart_rate,
            "temperature": self.temperature
        }

    def to_simple_dict(self):
        """
        latitude, longitude, elevation
        """
        return {
            "latitude": self.latitude,
            "longitude": self.longitude,
            "elevation": self.elevation,
        }

    @classmethod
    def create_track_points_from_gpx_segment(
            cls, segment: GPXTrackSegment) -> Tuple[List[TrackPoint], str]:
        """
        Takes in a GPXTrackPoint and returns a list of TrackPoint objects
        """
        parsed_track_points: Union[List[TrackPoint], list] = []
        coordinates: Union[List[tuple], list] = []
        point: GPXTrackPoint
        for point in segment.points:
            current_track_point = cls(
                latitude=point.latitude,
                longitude=point.latitude,
                elevation=point.elevation,
                time=point.time,
                speed=point.speed or 0)
            coordinates.append((point.latitude, point.longitude))
            parsed_track_points.append(current_track_point)

        return parsed_track_points, polyline.encode(coordinates)
