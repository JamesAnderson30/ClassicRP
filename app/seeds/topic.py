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
        created_at = "2024-11-16 11:17:49.755796",
        privacy_level=0
        # created_at= datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y") )
    )

    testTopic2 = Topic(
        subject =  'Second Seed Topic',
        body = 'This is a second seed topic, to help fill up things',
        user_id = 2,
        category_id=2,
        created_at = "2024-11-17 14:46:59.176038",
        privacy_level=1
    )

    testTopic3 = Topic(
        subject =  'A typical DND adventure!',
        body = "The village is a normal human one. A breeze passes through and a cow moos. A single guard sleepily watches the front gate.",
        user_id = 2,
        category_id=2,
        created_at = "2024-12-02 20:08:39.184674",
        privacy_level=2
    )

    HistoricalTopic1 = Topic(
        subject= "The Oregan Trail",
        body = "Can you survive the journey across the west? Will you die of dysntary? Let's find out! This game will begin a week after this is posted, so be sure to submit character profiles before that time! Outcomes will mostly be determined by dice rolls, so you just have to provide the floruish and character. It'll be great fun! Game will reset everytime the party fails, or makes it!",
        user_id = 1,
        category_id = 3,
        created_at = "2024-12-02 20:08:39.184674",
        privacy_level = 3    
    
    )

    db.session.add(testTopic1)
    db.session.add(testTopic2)
    db.session.add(testTopic3)
    db.session.add(HistoricalTopic1)
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
