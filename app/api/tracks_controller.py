from flask import Blueprint
from flask_login import current_user, login_required

tracks_controller = Blueprint("routes", __name__)


@tracks_controller.route("")
@login_required
def all_routes():
    """
    Return a to_simple_dict() of the current users routes
    """
    return [route.to_simple_dict() for route in current_user.routes]


@tracks_controller.route("/new")
@login_required
def create_route():
    """
    Check if file type is xml
    parse data
    create route and trackpoint for each
    """
    pass
