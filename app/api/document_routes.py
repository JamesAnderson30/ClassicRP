from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Document


document_routes = Blueprint('documents', __name__)


@document_routes.route('/current')
@login_required
def user_documents():
    documents = Document.query.filter(current_user.id == Document.user_id).all()
    return {'documents': [document.to_dict() for document in documents]}



