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

@topic_routes.route('/new')
def new_topic():
     # Create Post
    topic = TopicForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        topic = Topic(
            subject=form.data['subject'],
            user_id=current_user.id,
            category_id=form.data['category_id']
            created_at=datetime.datetime.now()
        )
        db.session.add(post)
        db.session.commit()
        return jsonify(post.id), 201
    else:
        return form.errors, 401
