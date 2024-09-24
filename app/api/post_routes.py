from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Post

post_routes = Blueprint('post', __name__)

# Get Post Information
@category_routes.route('/<int:id>')
def post(id):
    """
    Query for all users and returns them in a list of user dictionaries
    """
    post = Post.query.get(id)

    # category_list = []

    # for category in categories:
    #     category_dict = category.to_dict()
    #     category_dict['Topic'] = [Topic.to_dict() for Topic in category.Topic]
    #     category_list.append(category_dict)

    return jsonify(post.to_dict())

