"""adding tables

Revision ID: 1161d2c32bab
Revises: ffdc0a98111c
Create Date: 2024-09-22 15:24:49.401124

"""
from alembic import op
import sqlalchemy as sa
import time

# revision identifiers, used by Alembic.
revision = '1161d2c32bab'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('category',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('description', sa.String(length=5000), nullable=False),
    sa.Column('options', sa.String(length=5000), nullable=True),
    sa.Column('order', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role', sa.String(length=40), nullable=True))
        batch_op.add_column(sa.Column('profilePicture', sa.String(length=1000)))
    # ### end Alembic commands ###
    # Manual
    op.create_table('topic',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('subject', sa.String(length=250), nullable=False),
    sa.Column('body', sa.String(length=10000), nullable=False),
    sa.Column('options', sa.String(length=5000), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=True, default=int(time.time())),
    sa.Column('created_at', sa.String(250), nullable=False),
    sa.Column('privacy_level', sa.Integer(), default=0),
    sa.PrimaryKeyConstraint('id')
    )

    op.create_table('post',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.String(length=250), nullable=False, default=int(time.time())),
    sa.Column('body', sa.String(length=10000), nullable=False),
    sa.Column('options', sa.String(length=5000), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('topic_id', sa.Integer(), nullable=False),
    sa.Column('replied_to', sa.String(length=200), nullable=True),
    sa.Column('replies', sa.String(length=400), nullable=True),
    sa.Column('topic_profile_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )

    op.create_table('topic_profile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.String(length=250), nullable=False, default=int(time.time())),
    sa.Column('name', sa.String(length=1000), nullable=False),
    sa.Column('body', sa.String(length=10000), nullable=False),
    sa.Column('color', sa.String(length=10000), default="none"),
    sa.Column('user_id', sa.Integer(), nullable=False),
    # sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('topic_id', sa.Integer(), nullable=False),
    sa.Column('avatar', sa.String(length=1000)),
    sa.Column('approved', sa.Integer(), nullable=False, default=0),
    sa.PrimaryKeyConstraint('id')
    )

    op.create_table('document',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('subject', sa.String(length=250), nullable=False),
    sa.Column('body', sa.Text(), nullable=False),
    # sa.Column('group_id', sa.String(length=100)),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    # op.create_table('group',
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('name', sa.String(length=100), nullable=False),
    # sa.Column('user_id', sa.Integer(), nullable=False),
    # )
def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('role')
        batch_op.drop_column('profilePicture')

    op.drop_table('category')
    op.drop_table('topic')
    op.drop_table('topic_profile')
    op.drop_table('post')
    op.drop_table('document')

    # ### end Alembic commands ###
