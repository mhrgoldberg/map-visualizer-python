from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import AnyOf, DataRequired, Email, ValidationError, NumberRange
from app.models import User
from app.utility import SportOptions, GenderOptions


def email_exists(_form, field):
    print("Checking if email exits", field.data)
    user = User.query.filter(User.email == field.data).first()
    if user:
        raise ValidationError("Email is already registered.")


def user_exists(_form, field):
    print("Checking if username exits", field.data)
    user = User.query.filter(User.username == field.data).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    username = StringField(validators=[DataRequired(), user_exists])
    email = StringField('email', validators=[
        DataRequired(), email_exists, Email()
    ])
    password = StringField(validators=[DataRequired()])
    age = IntegerField(validators=[NumberRange(min=10, max=150)])
    gender = StringField(validators=[AnyOf(GenderOptions.__members__.keys())])
    primary_sport = StringField(
        validators=[AnyOf(SportOptions.__members__.keys())])
