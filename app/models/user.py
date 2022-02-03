
from app.utility import GenderOptions, SportOptions
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

from .db import db


class User(db.Model, UserMixin):

    __tablename__ = 'users'

    # Primary Columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.Enum(GenderOptions))
    age = db.Column(db.Integer())
    primary_sport = db.Column(db.Enum(SportOptions))

    created_at = db.Column(
        db.DateTime(timezone=True),
        server_default=db.func.now()
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=db.func.now(),
        onupdate=db.func.now()
    )

    # Relationships
    tracks = db.relationship("Track", back_populates="user")
    workouts = db.relationship("Workout", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        """
        hashes the password and sets hashed_password instance variable
        """
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        """
        checks password against saved password
        """
        return check_password_hash(self.password, password)

    def to_simple_dict(self):
        """
        id, username, email
        """
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }

    def to_dict(self):
        """
        id, username, email, gender, age, primary_sport
        """
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "gender": self.gender,
            "age": self.age,
            "primary_sport": self.primary_sport
        }
