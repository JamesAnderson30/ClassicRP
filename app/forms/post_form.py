from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Post

class PostForm(FlaskForm):
    subject = StringField('subject', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
