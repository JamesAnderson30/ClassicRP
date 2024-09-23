from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

category_routes = Blueprint('category', __name__)


@category_routes.route('/')
def category():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}
