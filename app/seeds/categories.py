from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_categories():
    Scifi = Category(
        name='Scifi', description='Forum RP centered around a technological prowess')
    
    Fantasy = Category(
        name='Fantasy', description="Forum RP centered around a fantastical past")
    
    Historical = Category(
        name='Historical', description="Forum RP centered around a mundane, but real past")
    
    NonRP = Category(
        name='Non-RP', description="Forum about any discussions other than RP")

    db.session.add(Scifi)
    db.session.add(Fantasy)
    db.session.add(Historical)
    # db.session.add(NonRP)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.category RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM category"))

    db.session.commit()
