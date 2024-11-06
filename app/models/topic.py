from .db import db, environment, SCHEMA, add_prefix_for_prod
from .category import Category
from .user import User
from .post import Post

class Topic(db.Model):
    __tablename__ = 'topic'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(250), nullable=False)
    body = db.Column(db.String(10000), nullable=False)
    options = db.Column(db.String(5000), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("category.id")), nullable=False)
    created_at = db.Column(db.String(250), nullable=False)


    User = db.relationship('User', back_populates='Topic')
    Category = db.relationship('Category', back_populates='Topic')
    Post = db.relationship('Post', cascade="all,delete", back_populates='Topic', )

    def to_dict(self):
        print("!!!$$$$$$$!!!")
        i = 0
        print(vars(self.User))
        for post in self.Post:
            print(i)
            i = i + 1
            print(post)
        return {
            'id': self.id,
            'subject': self.subject,
            'body': self.body,
            'user_id': self.user_id,
            'username': self.User.username,
            'category_id': self.category_id,
            'created_at': self.created_at,
            'user_profile_picture': self.User.profilePicture,
            'topic_specific_profile_picture': "default"
        }
    # # Uncomment When Quesion Comments is added
    # question_comments = db.relationship('QuestionComment', back_populates='question', cascade="all, delete-orphan")
    # question_following = db.relationship('QuestionFollowing', back_populates='question', cascade="all, delete-orphan")
    # question_tags = db.relationship('QuestionTag', back_populates='question', cascade="all, delete-orphan")
