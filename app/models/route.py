from .db import db

class Route(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String)
	polyline = db.Column(db.Text)
	user_id = db.Column(db.Integer, )