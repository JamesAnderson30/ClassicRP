from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Post, db
from app.forms import PostForm
from flask_login import current_user, login_user, logout_user, login_required
import datetime


post_routes = Blueprint('post', __name__)

# Get Post Information by Topic Id
@post_routes.route('/topic/<int:id>')
def post(id):
    posts = Post.query.filter_by(topic_id = id)
    results = []

    for post in posts:
        results.append(post.to_dict())

    return jsonify(results)

# POST new Post Information
@post_routes.route("/new", methods=['POST'])
def new_post():
     # Create Post
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            body=form.data['body'],
            topic_id=form.data['topic_id']['topic_id'],
            user_id=current_user.id,
            created_at=datetime.datetime.now()
        )
        db.session.add(post)
        db.session.commit()
        return jsonify(post.id), 201
    else:
        return form.errors, 401

# Edit Post Information
@post_routes.route("/<int:id>", methods=['PUT'])
def edit_post(id):
     # Create Post
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        id = form.data['id']
        post = Post.query.filter_by(id = id)
        if current_user.id != post.user_id:
            return jsonify({"message": "Unauthorized"}), 401

        post.body=form.data['body']

        db.session.add(post)
        db.session.commit()
        return jsonify(post.id), 201
    else:
        return form.errors, 401
