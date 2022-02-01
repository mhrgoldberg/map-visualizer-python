from app.forms import TrackForm
from app.models import Track
from flask import Blueprint, current_app, request
from flask_login import current_user, login_required
from sqlalchemy import exc
from sqlalchemy.orm import joinedload

tracks_controller = Blueprint('tracks_controller', __name__)

tracks_controller = Blueprint("routes", __name__)


@tracks_controller.route("/")
@login_required
def all_routes() -> dict:
    """
    Return a to_simple_dict() of the current users routes
    """
    return {
        "dict": {
            track.id: track.to_simple_dict() for track in current_user.tracks
        },
        "ordering": [track.id for track in current_user.tracks]

    }


@tracks_controller.route("/<int:track_id>", methods=["GET"])
@login_required
def get_track(track_id: int) -> dict:
    """
    Return a to_dict() of the current users route
    """
    track = Track.query.options(joinedload(
        Track.track_points)).get(track_id)
    if track is None or track.user_id != current_user.id:
        return {
            "errors": {"track": "Sorry, this track does not exist."}
        }, 404
    return track.to_dict()


@tracks_controller.route("/", methods=["POST"])
@login_required
def create_track() -> dict:
    """
    Check if a file is present and a valid file type, then create a new track.
    """
    form = TrackForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['file'].data = request.files.get("file", None)

    if form.validate_on_submit():
        try:
            new_tracks = Track.create_tracks_from_gpx_file(
                form['file'].data,
                request.form['title'],
                request.form['sport_type'],
                current_user.id
            )
            return {
                track.id: track.to_simple_dict() for track in new_tracks
            }, 201
        except exc.SQLAlchemyError as e:
            current_app.logger.error(e)
            return {
                "errors": {
                    "form": "Sorry, there was an error saving your track.\
                         Please try again with a different file."
                }
            }, 400
    else:
        return {
            "errors": form.errors
        }, 400
