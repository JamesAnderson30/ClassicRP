from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Topic

class PostForm(FlaskForm):
    body = StringField('body', validators=[DataRequired()])
    subject = StringField('subject', validators=[DataRequired()])
    category_id = StringField('category_id')
    id = StringField('id')
