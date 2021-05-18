from flask import Blueprint
from flask_login import current_user, login_required
from app.models import Route
routes_controller = Blueprint("routes", __name__)


@routes_controller.route("")
@login_required
def all_routes():
    """
    Return a to_simple_dict() of the current users routes
    """

    return [route.to_simple_dict() for route in current_user.routes]
