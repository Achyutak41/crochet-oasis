from extensions import db


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.String(20),
        default="customer",
        nullable=False
    )

    orders = db.relationship(
        "Order",
        back_populates="customer",
        cascade="all, delete-orphan"
    )
    reset_token = db.Column(db.String(255), nullable=True, unique=True)
    reset_token_expires = db.Column(db.DateTime, nullable=True)
    def to_dict(self):

        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role
        }