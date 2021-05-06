from .db import db

class Route(db.Model):
	"""
	id: Integer, primary_key=True
	title: String(50), nullable=False
	distance: Float, nullable=False
	ascent: Float
	descent: Float
	created_at: DateTime, default=now
	updated_at: DateTime, default=now, onupdate=now
	+relationships: user, track_points, workouts
	$instance_methods: to_dict, to_simple_dict
	"""

	__tablename__ = "routes"
	# Primary Columns
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(50), nullable=False)
	distance = db.Column(db.Float, nullable=False)
	ascent = db.Column(db.Float)
	descent = db.Column(db.Float)
	#todo Add polyline for tile in routes index
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
	user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

	# Relationships
	user = db.relationship("User", back_populates="routes")
	track_points = db.relationship("TrackPoint", back_populates="route")
	workouts = db.relationship("Workout", back_populates="route")
	
	
	def to_dict(self):
		"""
		id, title, distance, ascent, descent, trackpoints
		"""
		return {
			"id": self.id,
			"title": self.title,
			"distance": self.distance,
			"ascent": self.ascent,
			"descent": self.descent,
			"track_points": [
				track_point.to_dict() for track_point in self.track_points
				]
		}

	def to_simple_dict(self):
		"""
		id, title, distance, ascent, descent
		"""
		return {
			"id": self.id,
			"title": self.title,
			"distance": self.distance,
			"ascent": self.ascent,
			"descent": self.descent
		}