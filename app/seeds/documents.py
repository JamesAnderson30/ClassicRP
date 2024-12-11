from app.models import db, Document, environment, SCHEMA
from sqlalchemy.sql import text
import datetime


# Adds a demo user, you can add other users here if you want
def seed_documents():
    testDocument1 = Document(
        body= 'This is the first seed post. It should belong to a topic, under a category, and belong to a user',
        subject = "My Document",
        user_id= 1,
        # group_id= 1
    )

       

    db.session.add(testDocument1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_documents():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.document RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM document"))

    db.session.commit()
