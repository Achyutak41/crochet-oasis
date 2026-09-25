from app import app
from extensions import db
from models import User
from werkzeug.security import generate_password_hash


ADMIN_EMAIL = "admin@crochetoasis.com"
ADMIN_PASSWORD = "admin123"


with app.app_context():

    existing_admin = User.query.filter_by(email=ADMIN_EMAIL).first()

    if existing_admin:
        print("Admin already exists.")
    else:
        admin = User(
            name="Crochet Oasis Admin",
            email=ADMIN_EMAIL,
            password_hash=generate_password_hash(ADMIN_PASSWORD),
            role="admin"
        )

        db.session.add(admin)
        db.session.commit()

        print("Admin created successfully.")