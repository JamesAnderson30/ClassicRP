
import pprint
from sqlalchemy.orm import joinedload
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Topic, Post, db, User, Topic_Profile
from app.forms import TopicForm, TopicProfileForm
from sqlalchemy import desc
from flask_login import current_user, login_user, logout_user, login_required


import time


topic_routes = Blueprint('topic', __name__)



@topic_routes.route('/<int:id>',)
def topic_id(id):
    topic_req = Topic.query.get(id)
    if not topic_req:
        return jsonify({'message': "Topic not Found"}), 404
    topic = topic_req.to_dict()
    topic['Posts'] = [post.to_dict() for post in topic_req.Post]
    topic['Topic_Profiles'] = [topic_profile.to_dict() for topic_profile in  topic_req.Topic_Profile]
    return jsonify(topic), 200

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



@topic_routes.route('/recent')
def get_recents():
    topics = Topic.query.options(joinedload(Topic.Post)).order_by(desc(Topic.id)).limit(5).all()
    
        
    results = []
    
    for topic in topics:
        posts = topic.Post
        result = topic.to_dict()
        result['Post'] = []
        for post in posts:
            result['Post'].append(post.to_dict())
        results.append(result)

    return jsonify(results), 200


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
    errors = []

    if not form.data['body']:

        errors.append({'field': "body", "message": "body is required"})
    if not form.data['subject']:

        errors.append({'field': 'subject', 'message': 'subject is required'})

    if len(errors) == 0:
        topic = Topic(
            body=form.data['body'],
            category_id=form.data['category_id'],
            subject=form.data['subject'],
            user_id=current_user.id,
            created_at=int(time.time())
        )
        db.session.add(topic)
        db.session.commit()
        return jsonify(topic.id), 201
    else:
        return jsonify(errors), 401

@topic_routes.route('/<int:id>/register', methods=['POST'])
def register_profile(id):
     # Create Post
    form = TopicProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    errors = []

    if not form.data['aBody']:
        errors.append({'field': "body", "message": "Description is required"})
    if not form.data['aName']:
        errors.append({'field': 'name', 'message': 'Name is required'})
    if not form.data['aAvatar']:
        errors.append({'field': 'avatar', 'message': 'avatar is required'})

    if len(errors) == 0:
        topic_profile = Topic_Profile(
            body=form.data['aBody'],
            name=form.data['aName'],
            color=form.data['aColor'],
            avatar=form.data['aAvatar'],
            topic_id=id,
            approved=0,
            user_id=current_user.id,
            created_at=int(time.time())
        )
        db.session.add(topic_profile)
        db.session.commit()
        return jsonify(topic_profile.id), 201
    else:
        return jsonify(errors), 401
