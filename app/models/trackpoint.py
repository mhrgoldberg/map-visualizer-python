from .db import db

class TrackPoint(db.Model):
	"""
	id: Integer, primary_key=True
	latitude: Float, nullable=False
	longitude: Float, nullable=False
	elevation: Float
	+relationships: route
	&class_methods: to_dict(), to_simple_dict()
	
	"""
	__tablename__ = "track_points"
    
	# Primary Columns
	id = db.Column(db.Integer, primary_key=True)
	latitude = db.Column(db.Float, nullable=False)
	longitude = db.Column(db.Float, nullable=False)
	elevation = db.Column(db.Float)

	# Foreign Keys
	route_id = db.Column(db.Integer, db.ForeignKey("routes.id"), nullable=False)

	# Relationships
	route = db.relationship("Route", back_populates="track_points")

	def to_dict(self):
		"""
		id, latitude, longitude, elevation
		"""
		return {
			"id": self.id,
			"latitude": self.latitude,
			"longitude": self.longitude,
			"elevation": self.elevation,
		}
	
	def to_simple_dict(self):
		"""
		latitude, longitude, elevation
		"""
		return {
			"latitude": self.latitude,
			"longitude": self.longitude,
			"elevation": self.elevation,
		}