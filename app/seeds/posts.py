from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
import datetime


# Adds a demo user, you can add other users here if you want
def seed_posts():
    testPost1 = Post(
        body= 'This is the first seed post. It should belong to a topic, under a category, and belong to a user',
        user_id= 1,
        topic_id= 1,
        created_at= datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y") )

    db.session.add(testPost1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM post"))

    db.session.commit()
