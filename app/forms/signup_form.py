from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from app.models import User, PrimarySportOptions, GenderOptions


def user_exists(_form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


def in_primary_sports(_form, field):
    return field.data in [value.name for value in PrimarySportOptions]


def in_genders(_form, field):
    return field.data in [value.name for value in GenderOptions]


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[
        DataRequired(),
        user_exists,
        Email()
    ])
    age = IntegerField(validators=[NumberRange(min=10, max=150)])
    gender = StringField(validators=[in_genders])
    primary_sport = StringField(validators=[in_primary_sports])
    password = StringField('password', validators=[DataRequired()])
