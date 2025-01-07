from .db import db, environment, SCHEMA, add_prefix_for_prod
from .category import Category
from .user import User
from .post import Post
from .topic_profile import Topic_Profile

class Topic(db.Model):
    __tablename__ = 'topic'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # PRIVACY_LEVEL
    # 0 = Anyone can post
    # 1 = Anyone with a profile may Post
    # 2 = Only profiles approved by topic owner (new users can apply for access)
    # 3 = Only profiles approved by topic owner (no longer accepting applications)

    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(250), nullable=False)
    body = db.Column(db.String(10000), nullable=False)
    options = db.Column(db.String(5000), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("category.id")), nullable=False)
    created_at = db.Column(db.String(250), nullable=False)
    privacy_level = db.Column(db.Integer)


    User = db.relationship('User', back_populates='Topic')
    Category = db.relationship('Category', back_populates='Topic')
    Post = db.relationship('Post', cascade="all,delete", back_populates='Topic', )
    Topic_Profile = db.relationship('Topic_Profile', cascade="all,delete",back_populates='Topic')

    def to_dict(self):
        i = 0
        for post in self.Post:
            i = i + 1
        return {
            'id': self.id,
            'subject': self.subject,
            'body': self.body,
            'user_id': self.user_id,
            'username': self.User.username,
            'category_id': self.category_id,
            'created_at': self.created_at,
            'user_profile_picture': self.User.profilePicture,
            'topic_specific_profile_picture': "default",
            'privacy_level': self.privacy_level
        }
    # # Uncomment When Quesion Comments is added
    # question_comments = db.relationship('QuestionComment', back_populates='question', cascade="all, delete-orphan")
    # question_following = db.relationship('QuestionFollowing', back_populates='question', cascade="all, delete-orphan")
    # question_tags = db.relationship('QuestionTag', back_populates='question', cascade="all, delete-orphan")
