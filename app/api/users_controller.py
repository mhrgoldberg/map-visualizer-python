from flask import Blueprint
from flask_login import login_required
from app.models import User

users_controller = Blueprint('users', __name__)


@users_controller.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@users_controller.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
