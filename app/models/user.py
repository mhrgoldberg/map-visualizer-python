
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.utility import SportOptions, GenderOptions


class User(db.Model, UserMixin):
    """
    id: Integer, primary_key=True
    username: String(255), nullable=False, unique=True
    email: String(255), nullable=False, unique=True
    password: String(255), nullable=False
    gender: Enum(GenderOptions)
    age: Integer
    primary_sport: Enum(SportOptions)
    created_at: DateTime, default=now
    updated_at: DateTime, default=now, onupdate=now
    +relationships: routes, workouts
    &instance_methods: (
        check_password(password), to_simple_dict, to_dict, to_routes_dict,
        to_workouts_dict
        )
    """

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

    # def to_dict(
    #     self,
    #     id: bool = True,
    #     username: bool = True,
    #     email: bool = True,
    #     gender: bool = True,
    #     age: bool = True,
    #     primary_sport: bool = True,
    # ) -> dict:
    #     """
    #     id, username, email, gender, age, primary_sport
    #     """
    #     args = locals()
    #     filtered_values = {arg: args[arg] for arg in args if arg is True}
    #     dict_representation = {}
    #     return {
    #         "id": self.id,
    #         "username": self.username,
    #         "email": self.email,
    #         "gender": self.gender.name if self.gender else "",
    #         "age": self.age,
    #         "primary_sport": (
    #             self.primary_sport.name if self.primary_sport else ""
    #         )
    #     }

    # def to_routes_dict(self):
    #     """
    #     id, [routes.to_simple_dict()]
    #     """
    #     return {
    #         "id": self.id,
    #         "routes": [route.to_simple_dict() for route in self.routes]
    #     }

    # def to_workouts_dict(self):
    #     """
    #     id, [workouts.to_dict()]
    #     """
    #     return {
    #         "id": self.id,
    #         "workouts": [workout.to_dict() for workout in self.workouts]
    #     }

    def to_dict(
        self,
        columns: list = ['id', 'username', 'email',
                         'hashed_password', 'gender', 'age', 'primarySport'],
    ) -> dict:
        """
            iterate over columns and display all columns where the value are True
        """
