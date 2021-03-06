import logging
import os

from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf

from .api import auth_controller, tracks_controller, users_controller
from .config import Config
from .models import User, db
from .seeds import seed_commands

app = Flask(__name__)
app.config.from_object(Config)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


# Setup Logger
logging.basicConfig(filename='errors.log', level=logging.DEBUG,
                    format=f'%(asctime)s %(levelname)s %(name)s \
                        %(threadName)s : %(message)s')


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.register_blueprint(auth_controller, url_prefix='/api/auth')
app.register_blueprint(users_controller, url_prefix='/api/users')
app.register_blueprint(tracks_controller, url_prefix='/api/tracks')

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get(
            'FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
