from .db import db
class Workout(db.Model):
	"""
	id: Integer, primary_key=True
	title: String(50)
	description: Text
	distance: Float # Miles
	duration: Integer # Seconds
	created_at: DateTime, default=now
	updated_at: DateTime, default=now, onupdate=now
	+relationships: route, user
	&class_methods: to_dict
	"""

	__tablename__ = "workouts"

	# Primary Columns
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(50), nullable=False)
	description = db.Column(db.Text)
	distance = db.Column(db.Float) # Miles
	duration = db.Column(db.Integer, nullable=False) # Seconds
	created_at = db.Column(
		db.DateTime(timezone=True), 
		server_default=db.func.now()
		)
	updated_at = db.Column(
		db.DateTime(timezone=True),
		server_default=db.func.now(),
		onupdate=db.func.now()
		)

	
	# Foreign Keys
	route_id = db.Column(db.Integer, db.ForeignKey("routes.id"))
	user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

	# Relationships
	route = db.relationship("Route", back_populates="workouts")
	user = db.relationship("User", back_populates="workouts")

	def to_dict(self):
		"""
		id, title, description, distance, duration, route.to_simple_dict()
		"""
		return {
			"id": self.id,
			"title": self.title,
			"description": self.description,
			"distance": self.distance,
			"duration": self.duration,
			"route": self.route.to_simple_dict()
		}