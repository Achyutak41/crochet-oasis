from flask import Blueprint, request, jsonify

from extensions import db
from models import Product
from flask_jwt_extended import jwt_required, get_jwt
def admin_required():
    claims = get_jwt()

    if claims.get("role") != "admin":
        return False

    return True
product_bp = Blueprint(
    "product_bp",
    __name__,
    url_prefix="/api/products"
)


# GET all products
@product_bp.route("/", methods=["GET"], strict_slashes=False)
def get_products():
    products = Product.query.all()

    return jsonify([
        product.to_dict()
        for product in products
    ])


# GET one product
@product_bp.route("/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({
            "message": "Product not found"
        }), 404

    return jsonify(product.to_dict())


# CREATE product
@product_bp.route("/", methods=["POST"], strict_slashes=False)
@jwt_required()
def create_product():
    
    if not admin_required():
        return jsonify({"message": "Admin access required"}), 403
    data = request.get_json()
    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    required_fields = [
        "name",
        "category",
        "price",
        "image"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "message": f"{field} is required"
            }), 400

    product = Product(
        name=data["name"],
        category=data["category"],
        price=data["price"],
        image=data["image"],
        description=data.get("description")
    )

    db.session.add(product)
    db.session.commit()

    return jsonify(product.to_dict()), 201


# UPDATE product
@product_bp.route("/<int:product_id>", methods=["PUT"])
@jwt_required()
def update_product(product_id):
    
    if not admin_required():
        return jsonify({"message": "Admin access required"}), 403
    product = Product.query.get(product_id)
    if not product:
        return jsonify({
            "message": "Product not found"
        }), 404

    data = request.get_json()

    if "name" in data:
        product.name = data["name"]

    if "category" in data:
        product.category = data["category"]

    if "price" in data:
        product.price = data["price"]

    if "image" in data:
        product.image = data["image"]

    if "description" in data:
        product.description = data["description"]

    db.session.commit()

    return jsonify(product.to_dict())


# DELETE product
@product_bp.route("/<int:product_id>", methods=["DELETE"])
@jwt_required()
def delete_product(product_id):
    if not admin_required():
        return jsonify({"message": "Admin access required"}), 403
    product = Product.query.get(product_id)

    if not product:
        return jsonify({
            "message": "Product not found"
        }), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({
        "message": "Product deleted successfully"
    })