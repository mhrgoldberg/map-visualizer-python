from __future__ import annotations

# typing
from typing import Dict, List, TextIO, Union

# Options
from app.utility import SportOptions
# GPX parsing library
from gpxpy import parse
from gpxpy.geo import Location
from gpxpy.gpx import (GPXBounds, GPXRoute, GPXTrack, GPXTrackSegment,
                       MinimumMaximum, MovingData, UphillDownhill)

# Models
from .db import db
from .trackpoint import TrackPoint

# # Generic Variable for Route class
# RouteType = TypeVar('RouteType', bound='Route')


class Track(db.Model):
    """
    id: Integer, primary_key=True
    title: String(50), nullable=False
    sport_type: Enum(SportOptions), nullable=False
    distance: Float, nullable=False
    ascent: Float
    descent: Float
    polyline: Text
    center_latitude: Float
    center_longitude: Float
    min_latitude: Float
    min_longitude: Float
    max_latitude: Float
    max_longitude: Float
    min_elevation: Float
    max_elevation: Float
    created_at: DateTime, default=now
    updated_at: DateTime, default=now, onupdate=now
    +relationships: user, track_points, workouts
    &instance_methods: to_dict, to_simple_dict
    """

    __tablename__ = "tracks"
    # Primary Columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    sport_type = db.Column(db.Enum(SportOptions))
    distance = db.Column(db.Float, nullable=False)
    ascent = db.Column(db.Float)
    descent = db.Column(db.Float)
    polyline = db.Column(db.Text)
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
            "center": {
                "lat": self.center_latitude,
                "lng": self.center_longitude
            },
            "min": {
                "lat": self.min_latitude,
                "lng": self.min_longitude
            },
            "max": {
                "lat": self.max_latitude,
                "lng": self.max_longitude
            },
            "sport_type": self.sport_type,
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
            "sport_type": self.sport_type.name if self.sport_type else None,
            "distance": self.distance,
            "ascent": self.ascent,
            "descent": self.descent,
            "polyline": self.polyline

        }

    @classmethod
    def create_tracks_from_gpx_file(
        cls, file: TextIO, title: str, sport_type: str, user_id: int
    ) -> List[Track]:
        """
        Parses gpx file and creates a Track and related TrackPoint objects
        for each track segment
        """
        gpx_route: GPXRoute = parse(file)
        # return list if multiple tracks are created
        tracks: List[Track] = []
        track: GPXTrack
        for track in gpx_route.tracks:
            # remove empty datapoints
            track.remove_empty()
            new_track = Track.create_track_from_gpx_track(
                track, title, sport_type, user_id)
            db.session.add(new_track)
            tracks.append(new_track)
        db.session.commit()
        return tracks

    @classmethod
    def create_track_from_gpx_track(
        cls, track: GPXTrack, title: str, sport_type: str, user_id: int
    ) -> Track:
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
            sport_type=sport_type,
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
            parsed_track_points, polyline = TrackPoint.create_track_points_from_gpx_segment(
                segment)
            new_track.track_points.extend(parsed_track_points)
            new_track.polyline = polyline
        return new_track
