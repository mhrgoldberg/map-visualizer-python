from app.models import track
from pydantic import BaseModel, validator, ValidationError

from typing import TextIO


ALLOWED_EXTENSIONS = {'gpx'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class TrackRequestBody(BaseModel):
    title: str
    track: TextIO

    @validator('file')
    def validate_tack(cls, v):
        if not allowed_file(v.filename):
            raise ValidationError("File does not have a '.gpx' extension")
        return v
