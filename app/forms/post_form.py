from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Post

class PostForm(FlaskForm):
    body = StringField('body', validators=[DataRequired()])
    topic_id = StringField('topic_id')
