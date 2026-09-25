from flask import Blueprint, request, jsonify

from extensions import db
from models import Order, OrderItem, Product


order_bp = Blueprint(
    "order_bp",
    __name__,
    url_prefix="/api/orders"
)


# GET all orders
@order_bp.route("/", methods=["GET"], strict_slashes=False)
def get_orders():
    orders = Order.query.order_by(Order.id.desc()).all()

    return jsonify([
        order.to_dict()
        for order in orders
    ])


# GET one order
@order_bp.route("/<int:order_id>", methods=["GET"])
def get_order(order_id):
    order = Order.query.get(order_id)

    if not order:
        return jsonify({
            "message": "Order not found"
        }), 404

    return jsonify(order.to_dict())


# CREATE order
@order_bp.route("/", methods=["POST"], strict_slashes=False)
def create_order():
    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    required_fields = [
        "customer_name",
        "customer_phone",
        "items"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "message": f"{field} is required"
            }), 400

    if not data["items"]:
        return jsonify({
            "message": "Order must contain at least one item"
        }), 400

    total = 0
    order_items = []

    # Validate products and calculate total
    for item in data["items"]:

        product_id = item.get("product_id")
        quantity = item.get("quantity")

        if not product_id or not quantity:
            return jsonify({
                "message": "Each item requires product_id and quantity"
            }), 400

        product = Product.query.get(product_id)

        if not product:
            return jsonify({
                "message": f"Product {product_id} not found"
            }), 404

        quantity = int(quantity)

        if quantity <= 0:
            return jsonify({
                "message": "Quantity must be greater than zero"
            }), 400

        item_total = product.price * quantity
        total += item_total

        order_items.append({
            "product": product,
            "quantity": quantity,
            "price": product.price
        })

    # Create order
    order = Order(
        user_id=data.get("user_id"),
        customer_name=data["customer_name"],
        customer_phone=data["customer_phone"],
        customer_email=data.get("customer_email"),
        special_requirements=data.get("special_requirements"),
        total=total,
        status="Pending"
    )

    db.session.add(order)
    db.session.flush()

    # Create order items
    for item in order_items:

        order_item = OrderItem(
            order_id=order.id,
            product_id=item["product"].id,
            quantity=item["quantity"],
            price=item["price"]
        )

        db.session.add(order_item)

    db.session.commit()

    return jsonify(order.to_dict()), 201


# UPDATE order status
@order_bp.route("/<int:order_id>/status", methods=["PUT"])
def update_order_status(order_id):
    order = Order.query.get(order_id)

    if not order:
        return jsonify({
            "message": "Order not found"
        }), 404

    data = request.get_json()

    if not data or "status" not in data:
        return jsonify({
            "message": "Status is required"
        }), 400

    allowed_statuses = [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled"
    ]

    if data["status"] not in allowed_statuses:
        return jsonify({
            "message": "Invalid order status"
        }), 400

    order.status = data["status"]

    db.session.commit()

    return jsonify(order.to_dict())