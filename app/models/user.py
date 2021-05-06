from enum import Enum
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
class PrimarySport(Enum):
	Cycle = "Cycle"
	Run = "Run"
	Hike = "Hike"
	MultiSport = "MultiSport"
	Other = "Other"

	
class User(db.Model, UserMixin):
	"""
	id: Integer, primary_key=True
	user: name String(255), nullable=False, unique=True
	email: String(255), nullable=False, unique=True
	password: String(255), nullable=False
	primary_sport: Enum(PrimarySport)
	created_at: DateTime, default=now
	updated_at: DateTime, default=now, onupdate=now
	+relationships: routes, workouts
	@properties: password[getter, setter]
	&class_methods: (
		check_password(password), to_dict, to_routes_dict, to_workouts_dict
		)
	"""

	__tablename__ = 'users'

	# Primary Columns
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(40), nullable=False, unique=True)
	email = db.Column(db.String(255), nullable=False, unique=True)
	hashed_password = db.Column(db.String(255), nullable=False)
	primary_sport = db.Column(db.Enum(PrimarySport), nullable=False)


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
	routes = db.relationship("Route", back_populates="user")
	workouts = db.relationship("Workout", back_populates="user")

	@property
	def password(self):
		return self.hashed_password


	@password.setter
	def password(self, password):
		self.hashed_password = generate_password_hash(password)


	def check_password(self, password):
		return check_password_hash(self.password, password)


	def to_dict(self):
		return {
			"id": self.id,
			"username": self.username,
			"email": self.email
		}

	def to_routes_dict(self):
		return {
			"id": self.id,
			"routes": [route.to_simple_dict() for route in self.routes]
		}

	def to_workouts_dict(self):
		return {
			"id": self.id,
			"workouts": [workout.to_simple_dict() for workout in self.workouts]
		}
