from app.models import db, Topic_Profile, environment, SCHEMA
from sqlalchemy.sql import text
import datetime



# Adds a demo user, you can add other users here if you want
def seed_topic_profile():
    topic_profile = Topic_Profile(
        body= 'A big powerful barbarian',
        name= 'Barbarian',
        color= 'Brown',
        user_id = 1,
        approved = 1,
        topic_id= 1,
        avatar = "https://www.valhallagallery.com/cdn/shop/products/Barbarian_61x70_04_1080x.jpg?v=1625130523",
        created_at= datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y") )
    
    topic_profile2 = Topic_Profile(
        body= 'A Lanky City Guard',
        name= 'Richard',
        color= 'Green',
        user_id = 1,
        approved = 1,
        topic_id= 2,
        avatar = "https://imgcdn.stablediffusionweb.com/2024/3/6/87d67223-0469-4f5c-9a71-4f3ea6593d6b.jpg",
        created_at= datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y") )
    
    topic_profile_historical_1 = Topic_Profile(
        body = "Just a young lad, ready to make it to a completely flat and featurely plain where he will go insane",
        name = "Jimmy",
        color = "Brown",
        user_id = 1, 
        approved = 1,
        topic_id = 4,
        avatar = "https://i.pinimg.com/236x/23/7b/34/237b34fd878812878fc1588aaa6a1cf1.jpg",
        created_at = datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y")
    )

    topic_profile_historical_2 = Topic_Profile(
        body = "Just a young lass, trust me. She's not a grown woman from another town that's wanted. She insists we leave for the trail right away",
        name = "Sally",
        color = "Green", 
        user_id = 2,
        approved = 1, 
        topic_id = 4,
        avatar = "https://clipart-library.com/2023/kisspng-american-frontier-horse-cartoon-clip-art-5b2fa5c6def234.0126638515298492869132.jpg",
        created_at = datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y")
    )
    

    db.session.add(topic_profile)
    db.session.add(topic_profile2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_topic_profile():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topic_profile RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM topic_profile"))

    db.session.commit()
