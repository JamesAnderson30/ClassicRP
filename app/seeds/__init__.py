from flask.cli import AppGroup
from .users import seed_users, undo_users
from .topic import seed_topic, undo_topic
from .posts import seed_posts, undo_posts
from .topic_profile import seed_topic_profile, undo_topic_profile
from .categories import seed_categories, undo_categories
from .documents import seed_documents, undo_documents

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_posts()
        undo_topic()
        undo_categories()
        undo_users()
        undo_topic_profile()
        undo_documents()

    seed_users()
    seed_categories()
    seed_topic()
    seed_posts()
    seed_topic_profile()
    seed_documents()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_posts()
    undo_topic()
    undo_categories()
    undo_users()
    undo_topic_profile()
    # Add other undo functions here
