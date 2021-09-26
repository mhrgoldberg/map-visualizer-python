from logging import debug
from typing import Tuple, Union, TextIO
from flask.wrappers import Request
from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, ValidationError
from app.models import User, PrimarySportOptions, GenderOptions


# def in_primary_sports(_form, field):
#     return field.data in [value.name for value in PrimarySportOptions]

class TrackForm(FlaskForm):
    title = StringField(validators=[DataRequired()])
    file = FileField(validators=[FileRequired(), FileAllowed(['gpx'])])
