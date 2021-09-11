from flask import Blueprint, request, current_app
from flask_login import current_user, login_required
from pydantic import BaseModel
from flask_pydantic import validate
from app.models import Track, track
from sqlalchemy import exc
from devtools import debug

tracks_controller = Blueprint('tracks_controller', __name__)

tracks_controller = Blueprint("routes", __name__)

ALLOWED_EXTENSIONS = {'gpx'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@tracks_controller.route("")
@login_required
def all_routes():
    """
    Return a to_simple_dict() of the current users routes
    """
    return [route.to_simple_dict() for route in current_user.routes]


@tracks_controller.route("/", methods=["POST"])
@login_required
def create_track():
    """
    Check if file type is xml
    parse data
    create route and trackpoint for each
    """

    if 'file' not in request.files:
        return {
            "errors": {"file": "No file submitted, please try again."}
        }, 400
    file = request.files['file']

    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        return {
            "errors": {"file": "Sorry, this file is empty! Please try again."}
        }, 400

    if file and allowed_file(file.filename):
        # filename = secure_filename(file.filename)
        # file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        try:
            new_tracks = Track.create_track_from_gpx_file(
                file, request.form['title'], current_user.id)
            return {
                track.id: track.to_simple_dict() for track in new_tracks
            }, 201
        except exc.SQLAlchemyError as e:
            current_app.logger.error(e)
            return {
                "errors": {"form": "Sorry, there was an error saving your \
                    track. Please try again with ."}
            }, 400
    else:
        return {
            "errors": {"file": "Sorry, this file type is not supported. \
                Please try again."}
        }, 400
