from flask import Blueprint, request, jsonify

from mongo import db


order_bp = Blueprint(
    "order_bp",
    __name__,
    url_prefix="/api/orders"
)


orders_collection = db["orders"]
products_collection = db["products"]


def order_to_dict(order):
    return {
        "id": order["_id"],
        "user_id": order.get("user_id"),
        "customer_name": order["customer_name"],
        "customer_phone": order["customer_phone"],
        "customer_email": order.get("customer_email"),
        "special_requirements": order.get("special_requirements"),
        "total": order["total"],
        "status": order.get("status", "Pending"),
        "created_at": order.get("created_at"),
        "items": order.get("items", [])
    }


def get_next_order_id():
    last_order = orders_collection.find_one(
        sort=[("_id", -1)]
    )

    if last_order:
        return last_order["_id"] + 1

    return 1


# --------------------------------------------------
# GET ALL ORDERS
# --------------------------------------------------

@order_bp.route("/", methods=["GET"], strict_slashes=False)
def get_orders():

    orders = orders_collection.find({}).sort(
        "_id",
        -1
    )

    return jsonify([
        order_to_dict(order)
        for order in orders
    ])


# --------------------------------------------------
# GET ONE ORDER
# --------------------------------------------------

@order_bp.route("/<int:order_id>", methods=["GET"])
def get_order(order_id):

    order = orders_collection.find_one({
        "_id": order_id
    })

    if not order:
        return jsonify({
            "message": "Order not found"
        }), 404

    return jsonify(order_to_dict(order))


# --------------------------------------------------
# CREATE ORDER
# --------------------------------------------------

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

    # ----------------------------------------------
    # Validate products and calculate total
    # ----------------------------------------------

    for item in data["items"]:

        product_id = item.get("product_id")
        quantity = item.get("quantity")

        if not product_id or not quantity:

            return jsonify({
                "message": (
                    "Each item requires "
                    "product_id and quantity"
                )
            }), 400

        try:
            product_id = int(product_id)
            quantity = int(quantity)

        except (ValueError, TypeError):

            return jsonify({
                "message": (
                    "product_id and quantity "
                    "must be valid numbers"
                )
            }), 400

        if quantity <= 0:

            return jsonify({
                "message": (
                    "Quantity must be greater "
                    "than zero"
                )
            }), 400

        product = products_collection.find_one({
            "_id": product_id
        })

        if not product:

            return jsonify({
                "message": (
                    f"Product {product_id} not found"
                )
            }), 404

        price = float(product["price"])

        item_total = price * quantity

        total += item_total

        order_items.append({
            "product_id": product_id,
            "product_name": product["name"],
            "name": product["name"],
            "image": product.get("image"),
            "quantity": quantity,
            "price": price
        })

    # ----------------------------------------------
    # Create order
    # ----------------------------------------------

    order_id = get_next_order_id()

    order = {
        "_id": order_id,
        "user_id": data.get("user_id"),
        "customer_name": data["customer_name"],
        "customer_phone": data["customer_phone"],
        "customer_email": data.get("customer_email"),
        "special_requirements": data.get(
            "special_requirements"
        ),
        "total": total,
        "status": "Pending",
        "items": order_items,
        "created_at": __import__(
            "datetime"
        ).datetime.utcnow()
    }

    orders_collection.insert_one(order)

    return jsonify(
        order_to_dict(order)
    ), 201


# --------------------------------------------------
# UPDATE ORDER STATUS
# --------------------------------------------------

@order_bp.route(
    "/<int:order_id>/status",
    methods=["PUT"]
)
def update_order_status(order_id):

    order = orders_collection.find_one({
        "_id": order_id
    })

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

    orders_collection.update_one(
        {
            "_id": order_id
        },
        {
            "$set": {
                "status": data["status"]
            }
        }
    )

    updated_order = orders_collection.find_one({
        "_id": order_id
    })

    return jsonify(
        order_to_dict(updated_order)
    )