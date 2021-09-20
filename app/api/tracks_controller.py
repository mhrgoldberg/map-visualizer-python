from sqlalchemy import exc
from flask import Blueprint, request, current_app
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
# from flask_pydantic import validate
from app.models import Track
from app.utility import validate_gpx_file
from devtools import debug
# from app.forms.tracks_models import TrackRequestBody


tracks_controller = Blueprint('tracks_controller', __name__)

tracks_controller = Blueprint("routes", __name__)


@tracks_controller.route("")
@login_required
def all_routes():
    """
    Return a to_simple_dict() of the current users routes
    """
    return [route.to_simple_dict() for route in current_user.routes]


@tracks_controller.route("/<int:track_id>", methods=["GET"])
@login_required
def get_track(track_id: int) -> dict:
    """
    Return a to_dict() of the current users route
    """
    track = Track.query.options(joinedload(
        Track.track_points)).get(track_id).first()
    if track is None or track.user_id != current_user.id:
        return {
            "errors": {"track": "Sorry, this track does not exist."}
        }, 404
    return track.to_dict()


def allowed_file(filename):
    """
    Utility to check if the file extension is in the ALLOWED_EXTENSIONS.
    """
    ALLOWED_EXTENSIONS = {'gpx'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@tracks_controller.route("/", methods=["POST"])
@login_required
def create_track():
    """
    Check if a file is present and a valid file type, then create a new track.
    """
    isValid, response = validate_gpx_file(request)
    if isValid is True:
        try:
            new_tracks = Track.create_track_from_gpx_file(
                response, request.form['title'], current_user.id)
            return {
                track.id: track.to_simple_dict() for track in new_tracks
            }, 201
        except exc.SQLAlchemyError as e:
            current_app.logger.error(e)
            return {
                "errors": {"form": "Sorry, there was an error saving your \
                    track. Please try again with."}
            }, 400
    else:
        return response
