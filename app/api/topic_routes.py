from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Topic, Post, db
from app.forms import TopicForm
from flask_login import current_user, login_user, logout_user, login_required
import datetime

topic_routes = Blueprint('topic', __name__)



@topic_routes.route('/<int:id>',)
def topic_id(id):
    topic_req = Topic.query.get(id)
    if not topic_req:
        return jsonify({'message': "Topic not Found"}), 404
    topic = topic_req.to_dict()
    topic['Posts'] = [post.to_dict() for post in topic_req.Post]
    return jsonify(topic)

# Edit Post Information
@topic_routes.route("/<int:id>", methods=['PUT'])
def edit_topic(id):
     # Create Post
    form = TopicForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        id = form.data['id']

        topic = Topic.query.get(id)

        if not topic:
            return jsonify({'message': "Topic not Found"}), 404

        if current_user.id != topic.user_id:
            return jsonify({"message": "Unauthorized"}), 401

        topic.body=form.data['body']
        topic.subject=form.data['subject']

        db.session.add(topic)
        db.session.commit()
        return jsonify({'body': topic.body, 'subject': topic.subject, 'id': topic.id, 'category_id': topic.category_id}), 201
        # return 201
    else:
        return form.errors, 401

@topic_routes.route('/<int:id>', methods=['DELETE'])
def delete_topic(id):
    topic = Topic.query.get(id)
    if not topic:
        return jsonify({'message': "Topic not Found"}), 404

    if current_user.id != topic.user_id:
        return jsonify({"message": "Unauthorized"}), 401

    db.session.delete(topic)
    db.session.commit()
    return jsonify({'message': "Deleted"}), 201



@topic_routes.route('/new', methods=['POST'])
def new_topic():
     # Create Post
    form = TopicForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    errors = []

    if not form.data['body']:
        print('ERRRRRRRROR BODY')
        errors.append({'field': "body", "message": "body is required"})
    if not form.data['subject']:
        print('ERRRRRRRROR subject')
        errors.append({'field': 'subject', 'message': 'subject is required'})

    if len(errors) == 0:
        topic = Topic(
            body=form.data['body'],
            category_id=form.data['category_id'],
            subject=form.data['subject'],
            user_id=current_user.id,
            created_at=datetime.datetime.now()
        )
        db.session.add(topic)
        db.session.commit()
        return jsonify(topic.id), 201
    else:
        return jsonify(errors), 401
