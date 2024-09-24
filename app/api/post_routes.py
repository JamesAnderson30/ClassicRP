from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Post


post_routes = Blueprint('post', __name__)

# Get Post Information
@category_routes.route('/<int:id>')
def post(id):
    post = Post.query.get(id)
    return jsonify(post.to_dict())

# POST new Post Information
@category_routes.route("/new")
def new_post():
     # Create Question
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            body=form.data['body'],
            subject=form.data['subject'],
            user_id=current_user.id
        )
        db.session.add(post)
        db.session.commit()
        res = {
            "id": question.id,
            "question": question.question,
            "subject": question.subject,
            "user_id": current_user.id
        }
        return jsonify(res), 201
    else:
        return form.errors, 401
