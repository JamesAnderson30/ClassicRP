from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
import datetime


# Adds a demo user, you can add other users here if you want
def seed_posts():
    testPost1 = Post(
        body= 'This is the first seed post. It should belong to a topic, under a category, and belong to a user',
        user_id= 1,
        topic_id= 1,
        created_at= "2024-11-16 11:17:49.755796")
    
    testPost2 = Post(
        body= 'This is a barbarian post',
        user_id= 1,
        topic_id= 1,
        topic_profile_id = 1,
        created_at= "2024-11-17 14:46:59.176038")
    
    testPost3 = Post(
        body= 'The guard leans against his big spear',
        user_id= 1,
        topic_id= 3,
        topic_profile_id = 2,
        created_at= "2024-12-02 20:08:39.184674"
    )

    # testPost4 = Post(

    # )
    
    testHistoricalPost1 = Post(
        body = "Jimmy, being a well known trail trotter, knows better than to drink water from a puddle in the road just because he is thirsty. (Intelligent roll = 10)",
        user_id = 2,
        topic_id = 4,
        topic_profile_id = 3,
        created_at = "2024-12-02 20:08:39.184674"
    )

    testHistoricalPost2 = Post(
        body = "Sally too, understood not to drink water off the ground. Unfortuantely for her, she fell forward into a puddle, drank a little by accident, then died of dysantry",
        user_id = 2,
        topic_id = 4,
        topic_profile_id = 4,
        created_at = "2024-12-02 20:08:39.184674"
    )
        

    db.session.add(testPost1)
    db.session.add(testPost2)
    db.session.add(testPost3)
    db.session.add(testHistoricalPost1)
    db.session.add(testHistoricalPost2)
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
