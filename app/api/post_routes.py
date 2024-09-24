from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Post

post_routes = Blueprint('post', __name__)

# Get Post Information
@category_routes.route('/<int:id>')
def post(id):
    post = Post.query.get(id)
    return jsonify(post.to_dict())


