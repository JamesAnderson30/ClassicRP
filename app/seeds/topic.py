from app.models import db, Topic, environment, SCHEMA
from sqlalchemy.sql import text
import datetime
import time


# Adds a demo user, you can add other users here if you want
def seed_topic():
    testTopic1 = Topic(
        subject= 'First Seed Topic',
        body= 'This is a test topic. Here we will be posting test posts. Feel free to test out your posts here.',
        user_id= 1,
        category_id= 1,
        created_at = int(time.time())
        # created_at= datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y") )
    )

    db.session.add(testTopic1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_topic():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topic RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM topic"))

    db.session.commit()
