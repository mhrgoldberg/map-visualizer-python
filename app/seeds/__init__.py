from flask.cli import AppGroup
from .users import seed_users, undo_users
from .workouts import seed_workouts, undo_workouts

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    """
    Seeds all tables
    """
    seed_users()
    seed_workouts()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    """
    Turncates all tables
    """
    undo_workouts()
    undo_users()
    # Add other undo functions here
