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

    testDocument2 = Document(
        body= """
            Lorem ipsum odor amet, consectetuer adipiscing elit. Dis malesuada sollicitudin tempus platea litora proin arcu. Efficitur consequat etiam blandit velit arcu. Condimentum nec quisque etiam; inceptos morbi placerat? Vehicula facilisi cubilia, class fringilla adipiscing lacinia. Laoreet lacus et cubilia vel ipsum fames dui. Viverra consequat quis rhoncus nulla accumsan quam class libero euismod. Placerat volutpat erat condimentum per donec donec fermentum sollicitudin est. Lectus metus eleifend nunc ac enim purus proin maecenas non?

            Maximus interdum malesuada luctus praesent habitant augue? Montes dui accumsan nec netus tempus. Amet ipsum nascetur quis cubilia curabitur metus neque congue. Vivamus est arcu convallis etiam nibh purus bibendum. Inceptos turpis sem ultricies imperdiet facilisis scelerisque penatibus adipiscing? Posuere eget dictumst nibh senectus tellus sem penatibus. Laoreet id blandit urna diam donec netus cubilia accumsan.

            Aliquet ultricies semper ante nascetur praesent quis volutpat? Litora sit nisl consectetur suscipit netus mauris litora et. Posuere euismod sociosqu nunc posuere augue. Orci risus nam volutpat purus nisl feugiat magnis ornare. Vulputate pretium id nunc eleifend nibh magna aliquam. Amet sapien commodo ridiculus metus suspendisse.

            Habitasse nunc mi tincidunt potenti class conubia imperdiet volutpat. Orci diam nascetur magna blandit facilisis faucibus. Curae convallis vel sollicitudin primis litora luctus. Condimentum est aenean id; lorem donec suspendisse fringilla tristique proin. Maximus venenatis per sem integer id tristique pulvinar elit lacus. Id lobortis eu aliquam, hac nulla arcu. Sollicitudin nec pharetra odio vehicula nam felis conubia magna fames. Ligula mollis enim risus nascetur faucibus himenaeos.

            Posuere sit integer porttitor praesent vulputate; id tristique. Est nam sociosqu dui condimentum dignissim praesent. Orci tellus erat maximus montes maximus varius aliquet erat. Curae sem eu molestie inceptos quisque, posuere congue pulvinar. Porttitor lobortis scelerisque nulla cubilia habitant neque? Risus fusce lectus molestie himenaeos vehicula netus. Blandit viverra vehicula primis enim malesuada nascetur primis tellus sem.

            Acursus quisque posuere praesent inceptos iaculis tempor fames. Donec tempor proin metus mauris ultricies id maximus. Lobortis lobortis pharetra est nam aliquam purus odio pulvinar. Vivamus erat posuere nulla semper iaculis. Nostra laoreet diam accumsan nisi senectus. Quis velit ridiculus ultricies nisl fermentum maximus. Imperdiet mattis magnis ac sem blandit.

            Dui lectus magna felis natoque rutrum. Fringilla odio mi maximus congue inceptos conubia laoreet praesent. Nibh per ut nullam felis duis hac platea. Nascetur amet nascetur semper mauris augue. Risus vitae rhoncus magna rutrum adipiscing tempus cursus pulvinar. Vel ornare cursus porttitor dis accumsan maecenas sapien. Imperdiet urna a facilisi amet litora metus congue ex at.

            Interdum curae faucibus massa praesent rutrum. Nunc maximus ridiculus imperdiet sem pellentesque tempor at. Vivamus diam euismod fermentum volutpat viverra. Aaliquam lectus etiam tellus metus amet risus malesuada euismod. Leo nam eros mauris facilisis sapien primis. Sociosqu malesuada fusce proin porttitor neque; eu condimentum facilisis libero. Nam tincidunt quis lobortis sit taciti lacinia venenatis metus.

            Nullam litora elementum eget consequat augue urna mauris mus. Enim hendrerit pharetra fusce inceptos potenti hac. Eros euismod massa cras primis, porta nec vivamus. Nisl nisi tortor tellus aliquam non. Tempor dapibus ornare hac nisi mi. Varius enim blandit blandit laoreet sapien hendrerit.

            Fringilla molestie nam porta lectus nunc ornare habitant. Interdum suscipit taciti justo inceptos fames eget. Fusce nascetur ullamcorper; proin a tempus mus. Risus amet mus condimentum eu maximus risus ad est vitae. Nisi hac vivamus metus aliquet; metus sapien volutpat finibus. Placerat pellentesque fusce curabitur primis vestibulum. Pharetra vel velit nam nunc dapibus quam. Mauris egestas turpis nulla nascetur lacinia netus.

            Hac ornare dignissim fames nam interdum facilisi. Nostra ridiculus posuere parturient urna finibus facilisi. Massa ad senectus sed nisi fermentum sapien eu. Eros finibus phasellus, etiam auctor at nullam feugiat. Posuere ipsum fringilla cubilia lacus elit ultrices. Consequat auctor habitant litora placerat nec. Dignissim eleifend senectus malesuada ridiculus rutrum.

            Lacus montes ullamcorper vivamus ex maecenas. Sollicitudin vivamus velit lorem lacinia egestas. Arcu scelerisque tempor quis faucibus sed penatibus facilisis. Molestie montes mollis primis, ad porttitor ex conubia. Egestas molestie egestas cras est mauris. Orci in risus nostra posuere ipsum a fusce. Pharetra habitasse leo hendrerit malesuada pretium.

            Cubilia id conubia amet sagittis commodo fermentum neque per vestibulum. Mattis praesent dui; nascetur aptent sociosqu duis. Ultricies ipsum duis magnis accumsan iaculis magna mi. Purus rhoncus integer eu quisque curae montes; libero parturient. Vivamus dictumst aliquam, eleifend ante mus nisl! Purus ut maecenas eu, nec ornare in. Montes tortor montes consectetur elementum; blandit inceptos bibendum. Vehicula leo eu dui ligula ultrices natoque vitae.

            Tortor nunc nisl dui parturient praesent iaculis. Facilisis tempus lacinia dolor suscipit proin aliquet nisl conubia. Ex justo maecenas eros sem luctus magnis imperdiet litora. Donec etiam eleifend class auctor viverra himenaeos maecenas class. Morbi sagittis etiam ultrices, duis parturient pretium. Fames eleifend suspendisse vivamus dis per.

            Metus volutpat vulputate id; euismod eu elit vestibulum. Nunc non neque eros senectus tristique est sagittis integer. Vitae nullam nulla nibh facilisi primis viverra ex viverra. Lacinia leo turpis litora class dictum. Mollis nascetur vitae platea proin dolor habitant. In porttitor mus potenti felis sed aliquam condimentum. Ultricies diam adipiscing quis fames platea torquent. Turpis nisi aptent ligula, cubilia eleifend ex eleifend interdum. Netus ornare morbi nunc non leo nunc mus morbi neque.

            Nam taciti lectus, vitae ridiculus accumsan integer sollicitudin ultricies. Accumsan senectus montes tristique pellentesque congue euismod dictum ornare. Suscipit mus pulvinar massa nam suscipit phasellus iaculis. Facilisis sed metus porta placerat turpis potenti etiam potenti. Purus consectetur purus mus parturient tortor. Lobortis magna placerat viverra imperdiet, vel pharetra lobortis.

            Iaculis leo facilisis euismod laoreet phasellus ullamcorper volutpat lacinia cursus. Consequat placerat malesuada tellus cras consequat mus. Cursus penatibus sapien fringilla turpis mollis, inceptos habitasse. Aliquet rhoncus natoque nibh interdum maecenas laoreet. Lectus eget leo mus risus nibh nec. Quis vitae donec lectus in conubia nunc convallis congue. Phasellus feugiat auctor himenaeos rutrum lacinia taciti senectus ipsum.

            Vehicula natoque magna commodo quis dis pulvinar. Curabitur senectus magna integer facilisi pulvinar consectetur laoreet. Integer pulvinar conubia auctor consequat facilisis laoreet ligula in. Ullamcorper nisl nec aptent pulvinar ligula. Purus class ullamcorper mus pulvinar sollicitudin nunc? Fringilla platea ultrices et senectus consequat?

            Aliquet id erat magnis laoreet porttitor. Nibh lobortis nibh torquent tellus lorem lacinia conubia suspendisse. Dolor fringilla facilisi mattis, sit neque vulputate vitae imperdiet. Gravida iaculis commodo ut urna orci penatibus donec fusce. Aliquet natoque vestibulum; pretium nibh et donec sapien vehicula. Phasellus vivamus etiam rutrum odio non praesent maximus.

            Lacinia posuere efficitur nibh fames et ridiculus parturient lectus ridiculus. Interdum orci mattis elementum phasellus pharetra in felis vulputate tristique. Fermentum sit varius montes nunc mattis et. Ad maecenas etiam etiam netus gravida dapibus ut. Facilisi ad est tristique sed tempus est nostra pretium. Nascetur accumsan mauris habitant a a conubia mauris. Quisque aliquet consectetur libero dolor; nec dictum nunc mattis a. Facilisi interdum metus ullamcorper egestas aptent platea pretium suscipit.""",
        subject = "My Long Document",
        user_id= 1,
        # group_id= 1
    )

       

    db.session.add(testDocument1)
    db.session.add(testDocument2)
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
