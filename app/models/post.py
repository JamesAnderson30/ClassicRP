from .db import db, environment, SCHEMA, add_prefix_for_prod
from .category import Category
from .user import User



class Post(db.Model):
    __tablename__ = 'post'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(10000), nullable=False)
    options = db.Column(db.String(5000), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("topic.id")), nullable=False)
    created_at = db.Column(db.String(250))


    User = db.relationship('User', back_populates='Post')
    Topic = db.relationship('Topic', back_populates='Post')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'options': self.options,
            'user_id': self.user_id,
            'username': self.User.username,
            'topic_id': self.topic_id,
            'created_at': self.created_at
        }
    # # Uncomment When Quesion Comments is added
    # question_comments = db.relationship('QuestionComment', back_populates='question', cascade="all, delete-orphan")
    # question_following = db.relationship('QuestionFollowing', back_populates='question', cascade="all, delete-orphan")
    # question_tags = db.relationship('QuestionTag', back_populates='question', cascade="all, delete-orphan")

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'question': self.question,
    #         'subject': self.subject,
    #         'user_id': self.user_id
    #     }
