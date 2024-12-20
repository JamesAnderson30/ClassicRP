from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Document, db



document_routes = Blueprint('documents', __name__)


@document_routes.route('/current')
@login_required
def user_documents():
    documents = Document.query.filter(current_user.id == Document.user_id).all()
    return {'documents': [document.to_dict() for document in documents]}

@document_routes.route('/new', methods=["POST"])
@login_required
def new_documents():
    doc = request.get_json()
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    print(doc)
    if not doc or not doc["subject"] or not doc["body"]:
        return jsonify({'error': 'documents must have a subject and body'}), 400
    new_document = Document(
        subject=doc["subject"],
        body=doc["body"],
        user_id=current_user.id
    )

    db.session.add(new_document)
    db.session.commit()
    return jsonify(new_document.to_dict())
    # document = Document(
    #     subject=
    # )

@document_routes.route('/<int:id>')
def get_document(id):
    document_req = Document.query.get(id)
    if not document_req:
        return jsonify({'error': "not found"}), 404
    return jsonify(document_req.to_dict())

@document_routes.route('/<int:id>', methods=["PUT"])
def update_document(id):
    document_req = Document.query.get(id)
    new_document = request.get_json()
    if not document_req:
        return jsonify({'error': "not found"}), 404
    print("!!!!!!!!!!!!!!!")
    print(new_document)
    if not new_document or not new_document["subject"] or not new_document["body"]:
        return jsonify({'error': 'documents must have a subject and body'}), 400
    
    document_req.subject = new_document["subject"]
    document_req.body = new_document["body"]

    db.session.add(document_req)
    db.session.commit()

    return  jsonify({"subject": new_document["subject"], "body": new_document["body"]})

@document_routes.route("/<int:id>", methods=['DELETE'])
def delete_document(id):
    # Create Post
        document = Document.query.get(id)

        if not document:
            return jsonify({'message': "document not Found"}), 404

        if current_user.id != document.user_id:
            return jsonify({"message": "Unauthorized"}), 401

        db.session.delete(document)
        db.session.commit()
        return jsonify({'message': "Deleted"}), 201
    
