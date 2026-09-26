from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt

from mongo import db


product_bp = Blueprint(
    "product_bp",
    __name__,
    url_prefix="/api/products"
)

products_collection = db["products"]


def product_to_dict(product):
    return {
        "id": product["_id"],
        "name": product["name"],
        "category": product["category"],
        "price": float(product["price"]),
        "image": product.get("image", ""),
        "description": product.get("description", "")
    }


def admin_required():
    claims = get_jwt()
    return claims.get("role") == "admin"


def get_next_product_id():
    last_product = products_collection.find_one(
        {},
        sort=[("_id", -1)]
    )

    if last_product is None:
        return 1

    return int(last_product["_id"]) + 1


# ==========================================
# GET ALL PRODUCTS
# ==========================================

@product_bp.route("/", methods=["GET"], strict_slashes=False)
def get_products():

    products = products_collection.find({}).sort("_id", 1)

    return jsonify([
        product_to_dict(product)
        for product in products
    ]), 200


# ==========================================
# GET ONE PRODUCT
# ==========================================

@product_bp.route("/<int:product_id>", methods=["GET"])
def get_product(product_id):

    product = products_collection.find_one({
        "_id": product_id
    })

    if not product:
        return jsonify({
            "message": "Product not found"
        }), 404

    return jsonify(
        product_to_dict(product)
    ), 200


# ==========================================
# CREATE PRODUCT
# ==========================================

@product_bp.route("/", methods=["POST"], strict_slashes=False)
@jwt_required()
def create_product():

    if not admin_required():
        return jsonify({
            "message": "Admin access required"
        }), 403

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

    try:
        price = float(data["price"])
    except (ValueError, TypeError):
        return jsonify({
            "message": "Price must be a valid number"
        }), 400

    product = {
        "_id": get_next_product_id(),
        "name": str(data["name"]).strip(),
        "category": str(data["category"]).strip(),
        "price": price,
        "image": str(data["image"]).strip(),
        "description": str(
            data.get("description", "")
        ).strip()
    }

    products_collection.insert_one(product)

    return jsonify(
        product_to_dict(product)
    ), 201


# ==========================================
# UPDATE PRODUCT
# ==========================================

@product_bp.route("/<int:product_id>", methods=["PUT"])
@jwt_required()
def update_product(product_id):

    if not admin_required():
        return jsonify({
            "message": "Admin access required"
        }), 403

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    existing_product = products_collection.find_one({
        "_id": product_id
    })

    if not existing_product:
        return jsonify({
            "message": "Product not found"
        }), 404

    update_data = {}

    if "name" in data:
        update_data["name"] = str(
            data["name"]
        ).strip()

    if "category" in data:
        update_data["category"] = str(
            data["category"]
        ).strip()

    if "price" in data:
        try:
            price = float(data["price"])
        except (ValueError, TypeError):
            return jsonify({
                "message": "Price must be a valid number"
            }), 400

        update_data["price"] = price

    if "image" in data:
        update_data["image"] = str(
            data["image"]
        ).strip()

    if "description" in data:
        update_data["description"] = str(
            data["description"]
        ).strip()

    if not update_data:
        return jsonify({
            "message": "No fields to update"
        }), 400

    products_collection.update_one(
        {"_id": product_id},
        {"$set": update_data}
    )

    updated_product = products_collection.find_one({
        "_id": product_id
    })

    return jsonify(
        product_to_dict(updated_product)
    ), 200


# ==========================================
# DELETE PRODUCT
# ==========================================

@product_bp.route("/<int:product_id>", methods=["DELETE"])
@jwt_required()
def delete_product(product_id):

    if not admin_required():
        return jsonify({
            "message": "Admin access required"
        }), 403

    result = products_collection.delete_one({
        "_id": product_id
    })

    if result.deleted_count == 0:
        return jsonify({
            "message": "Product not found"
        }), 404

    return jsonify({
        "message": "Product deleted successfully",
        "id": product_id
    }), 200