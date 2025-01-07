from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash



class Topic_Profile(db.Model):
    __tablename__ = 'topic_profile'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.String(250), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    body = db.Column(db.String(10000), nullable=False)
    color = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255), nullable=False)
    approved = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("topic.id")), nullable=False)


    Post = db.relationship('Post',cascade="all,delete",  back_populates='Topic_Profile')
    Topic = db.relationship("Topic", back_populates="Topic_Profile")
    User = db.relationship("User", back_populates="Topic_Profile")
    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at,
            'name': self.name,
            'body': self.body,
            'color': self.color,
            'avatar': self.avatar,
            'user_id': self.user_id,
            'topic_id': self.topic_id,
            'approved': self.approved
        }
