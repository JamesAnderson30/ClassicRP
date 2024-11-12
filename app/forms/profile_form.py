from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError


class TopicProfileForm(FlaskForm):
    aBody = StringField('aBody', validators=[DataRequired()])
    aName = StringField('aName', validators=[DataRequired()])
    aColor = StringField('aColor', validators=[DataRequired()])
    aAvatar = StringField('aAvatar', validators=[DataRequired()])
    topic_id = StringField('topic_id')
    
