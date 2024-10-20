from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import login_required
from app.models import Post, db
from app.forms import PostForm
from sqlalchemy import desc
from flask_login import current_user, login_user, logout_user, login_required
import datetime


post_routes = Blueprint('post', __name__)

# Get five most recent posts
@post_routes.route('/recent')
def recent_posts():
    posts = Post.query.options(joinedload(Post.Topic)).order_by(desc(Post.id)).limit(5).all()
    
    results = []

    for post in posts:
        result = post.to_dict()
        result['Topic'] = post.Topic.to_dict()
        results.append(result)
        

    return jsonify(results), 200

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

        post = Post.query.get(id)

        if not post:
            return jsonify({'message': "Post not Found"}), 404

        if current_user.id != post.user_id:
            return jsonify({"message": "Unauthorized"}), 401

        post.body=form.data['body']

        db.session.add(post)
        db.session.commit()
        return jsonify({'body': post.body, 'id': post.id}), 201
        # return 201
    else:
        return form.errors, 401

@post_routes.route("/<int:id>", methods=['DELETE'])
def delete_post(id):
    # Create Post
        post = Post.query.get(id)

        if not post:
            return jsonify({'message': "Post not Found"}), 404

        if current_user.id != post.user_id:
            return jsonify({"message": "Unauthorized"}), 401

        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': "Deleted"}), 201
        # return 201
