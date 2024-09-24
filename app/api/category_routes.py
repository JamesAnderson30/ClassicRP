from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Category

category_routes = Blueprint('category', __name__)


@category_routes.route('/')
def category():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    categories = Category.query.all()

    # category_list = []

    # for category in categories:
    #     category_dict = category.to_dict()
    #     category_dict['Topic'] = [Topic.to_dict() for Topic in category.Topic]
    #     category_list.append(category_dict)

    return jsonify({'categories':[category.to_dict() for category in categories]})

@category_routes.route('/<int:id>',)
def category_id(id):
    category = Category.query.get(id)
    return jsonify({'category': category.to_dict(),'Topics':[topic.to_dict() for topic in category.Topic]})
