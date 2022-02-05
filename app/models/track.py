from __future__ import annotations

import os
import shutil
from typing import Dict, List, TextIO, Union

# utility
import polyline
import requests
from app.utility import SportOptions, create_url
from cloudinary.uploader import upload
from gpxpy import parse
from gpxpy.geo import Location
from gpxpy.gpx import (
    GPXBounds,
    GPXRoute,
    GPXTrack,
    GPXTrackSegment,
    MinimumMaximum,
    UphillDownhill,
)

# Models
from .db import db
from .trackpoint import TrackPoint


class Track(db.Model):
    __tablename__ = "tracks"
    # Primary Columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    sport_type = db.Column(db.Enum(SportOptions))
    distance = db.Column(db.Float, nullable=False)
    ascent = db.Column(db.Float)
    descent = db.Column(db.Float)
    polyline = db.Column(db.Text, nullable=False)
    center_latitude = db.Column(db.Float)
    center_longitude = db.Column(db.Float)
    min_latitude = db.Column(db.Float)
    min_longitude = db.Column(db.Float)
    max_latitude = db.Column(db.Float)
    max_longitude = db.Column(db.Float)
    min_elevation = db.Column(db.Float)
    max_elevation = db.Column(db.Float)
    map_150px_img_url = db.Column(db.String)

    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now()
    )

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # Relationships
    user = db.relationship("User", back_populates="tracks")
    track_points = db.relationship(
        "TrackPoint", back_populates="track", passive_deletes=True
    )
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
            "center": {"lat": self.center_latitude, "lng": self.center_longitude},
            "min": {"lat": self.min_latitude, "lng": self.min_longitude},
            "max": {"lat": self.max_latitude, "lng": self.max_longitude},
            "sport_type": self.sport_type,
            "track_points": [
                track_point.to_dict() for track_point in self.track_points
            ],
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
            "polyline": self.polyline,
            "img_url": self.map_150px_img_url,
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
                track, title, sport_type, user_id
            )
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
        # moving_data: MovingData = track.get_moving_data()
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
            distance=track.length_3d(),
            min_elevation=min_max_elevation.minimum,
            max_elevation=min_max_elevation.maximum,
            ascent=uphill_downhill.uphill,
            descent=uphill_downhill.downhill,
            user_id=user_id,
        )

        parsed_track_points: Union[List[TrackPoint], List] = []
        segment: GPXTrackSegment
        for segment in track.segments:
            parsed_track_points = TrackPoint.create_track_points_from_gpx_segment(
                segment
            )
            new_track.track_points.extend(parsed_track_points)

            # Reduce points to mitigate url length limits when requesting map
            # Shorten polyline if track is longer than 50 miles
            if new_track.distance > 80467:
                segment.reduce_points(200)
            else:
                segment.reduce_points(100)

            # convert updated segment to coordinates
            coordinates = [(p.latitude, p.longitude) for p in segment.points]
            new_track.polyline = polyline.encode(coordinates, 5)

            # request img file from google maps / upload to cloudinary
            url = create_url(new_track.polyline, 150)

            r = requests.get(url, stream=True)

            if r.status_code == 200:
                with open("./app/utility/img.png", "wb") as f:
                    r.raw.decode_content = True
                    shutil.copyfileobj(r.raw, f)
                img = None
                try:
                    img = upload("./app/utility/img.png", tags="150-static-map")
                except Exception as e:
                    print(e)
                new_track.map_150px_img_url = img["url"]
                os.remove("./app/utility/img.png")

        return new_track
