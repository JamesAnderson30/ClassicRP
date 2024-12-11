from .db import db, environment, SCHEMA, add_prefix_for_prod


class Group(db.Model):
    __tablename__ = 'group'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    User = db.relationship('User', back_populates='Group')

    def to_dict(self):

        return {
            'id': self.id,
            'subject': self.subject,
            'body': self.body,
            'group': self.body
        }