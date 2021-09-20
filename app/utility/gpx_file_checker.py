from flask.wrappers import Request
from typing import Tuple, Union, TextIO


def allowed_file(filename: str) -> bool:
    """
    Utility to check if the file extension is in the ALLOWED_EXTENSIONS.
    Returns a tuple with the
    """
    ALLOWED_EXTENSIONS = {'gpx'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def validate_gpx_file(request: Request) -> Tuple[bool, Union[TextIO or dict]]:
    """
    Checks if a file is present and has a GPX extension.
    If the file is valid, it returns a tuple of True and the file object or
    a tuple of False and a dict with the error message.
    """
    if 'file' not in request.files:
        return False, {
            "errors": {"file": "No file submitted, please try again."}
        }, 400
    file = request.files['file']

    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        return False, {
            "errors": {"file": "Sorry, this file is empty! Please try again \
                with a different file."}
        }, 400

    if file and not allowed_file(file.filename):
        return False, {
            "errors": {"file": "Sorry, this file type is not supported. \
                Please try again with a GPX file."}

        }, 400
    else:
        # In this case the file is valid and we can return the file object
        return True, file
