from .db import db, environment, SCHEMA, add_prefix_for_prod


class Document(db.Model):
    __tablename__ = 'document'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    subject =  db.Column(db.String(250))
    body = db.Column(db.Text())
    # group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("group.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    User = db.relationship('User')

    def to_dict(self):

        return {
            'id': self.id,
            'subject': self.subject,
            'body': self.body,
            'group': self.body,
            'user_id': self.user_id
        }