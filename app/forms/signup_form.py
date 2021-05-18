from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, PrimarySportOptions


def user_exists(_form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


def in_primary_sports(_form, field):
    return field.data in [value.name for value in PrimarySportOptions]


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[
        DataRequired(),
        user_exists,
        Email()
    ])
    primary_sport = StringField(validators=[in_primary_sports])
    password = StringField('password', validators=[DataRequired()])
