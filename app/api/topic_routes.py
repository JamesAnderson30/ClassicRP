from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Topic

topic_routes = Blueprint('topic', __name__)



@topic_routes.route('/<int:id>',)
def topic_id(id):
    topic_req = Topic.query.get(id)
    topic = topic_req.to_dict()
    topic['Posts'] = [post.to_dict() for post in topic_req.Post]
    return jsonify(topic)
