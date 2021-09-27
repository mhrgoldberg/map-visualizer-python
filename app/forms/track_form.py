from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, AnyOf
from app.utility import SportOptions


class TrackForm(FlaskForm):
    title = StringField(validators=[DataRequired()])
    sport = StringField(
        validators=[DataRequired(), AnyOf(SportOptions.__members__.keys())])
    file = FileField(validators=[FileRequired(), FileAllowed(['gpx'])])
