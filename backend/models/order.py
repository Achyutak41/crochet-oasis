from extensions import db


class Order(db.Model):

    __tablename__ = "orders"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=True
    )

    customer_name = db.Column(
        db.String(100),
        nullable=False
    )

    customer_phone = db.Column(
        db.String(30),
        nullable=False
    )

    customer_email = db.Column(
        db.String(120),
        nullable=True
    )

    special_requirements = db.Column(
        db.Text,
        nullable=True
    )

    total = db.Column(
        db.Float,
        nullable=False
    )

    status = db.Column(
        db.String(30),
        default="Pending",
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        nullable=False
    )

    customer = db.relationship(
        "User",
        back_populates="orders"
    )

    items = db.relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan"
    )

    def to_dict(self):

        return {
            "id": self.id,
            "user_id": self.user_id,
            "customer_name": self.customer_name,
            "customer_phone": self.customer_phone,
            "customer_email": self.customer_email,
            "special_requirements": self.special_requirements,
            "total": self.total,
            "status": self.status,
            "created_at": self.created_at.isoformat()
            if self.created_at else None,
            "items": [
                item.to_dict()
                for item in self.items
            ]
        }


class OrderItem(db.Model):

    __tablename__ = "order_items"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    order_id = db.Column(
        db.Integer,
        db.ForeignKey("orders.id"),
        nullable=False
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id"),
        nullable=False
    )

    quantity = db.Column(
        db.Integer,
        nullable=False
    )

    price = db.Column(
        db.Float,
        nullable=False
    )

    order = db.relationship(
        "Order",
        back_populates="items"
    )

    product = db.relationship(
        "Product",
        back_populates="order_items"
    )

    def to_dict(self):
        return {
        "id": self.id,
        "product_id": self.product_id,
        "product_name": self.product.name if self.product else None,
        "name": self.product.name if self.product else None,
        "image": self.product.image if self.product else None,
        "quantity": self.quantity,
        "price": self.price
    }