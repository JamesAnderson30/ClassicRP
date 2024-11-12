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
        created_at = int(time.time()),
        privacy_level=0
        # created_at= datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y") )
    )

    testTopic2 = Topic(
        subject =  'Second Seed Topic',
        body = 'This is a second seed topic, to help fill up things',
        user_id = 2,
        category_id=2,
        created_at = int(time.time() - 100000),
        privacy_level=1
    )

    testTopic3 = Topic(
        subject =  'A typical DND adventure!',
        body = "The village is a normal human one. A breeze passes through and a cow moos. A single guard sleepily watches the front gate.",
        user_id = 2,
        category_id=2,
        created_at = int(time.time() - 150000),
        privacy_level=2
    )


    db.session.add(testTopic1)
    db.session.add(testTopic2)
    db.session.add(testTopic3)
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
