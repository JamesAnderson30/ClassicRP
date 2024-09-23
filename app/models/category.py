from .db import db, environment, SCHEMA, add_prefix_for_prod



class Category(db.Model):
    __tablename__ = 'category'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(5000), nullable=False)
    options = db.Column(db.String(5000), nullable=True)
    order = db.Column(db.Integer, nullable=True)

    Topic = db.relationship('Topic', back_populates='Category')


    # user = db.relationship('User', back_populates='questions')
    # answers = db.relationship('Answer', back_populates='question', cascade="all, delete-orphan")
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
