from extensions import db


class Product(db.Model):

    __tablename__ = "products"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(150),
        nullable=False
    )

    category = db.Column(
        db.String(100),
        nullable=False
    )

    price = db.Column(
        db.Float,
        nullable=False
    )

    image = db.Column(
        db.String(500),
        nullable=False
    )

    description = db.Column(
        db.Text,
        nullable=True
    )

    order_items = db.relationship(
        "OrderItem",
        back_populates="product"
    )

    def to_dict(self):

        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "price": self.price,
            "image": self.image,
            "description": self.description
        }