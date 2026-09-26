from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

from mongo import db

import secrets
from datetime import datetime, timezone, timedelta


auth_bp = Blueprint(
    "auth_bp",
    __name__,
    url_prefix="/api/auth"
)


# MongoDB collection
users_collection = db["users"]


# --------------------------------------------------
# INDEXES
# --------------------------------------------------

# Email must be unique
users_collection.create_index(
    "email",
    unique=True
)

# Reset token must be unique only when it contains
# an actual string value.
users_collection.create_index(
    "reset_token",
    unique=True,
    partialFilterExpression={
        "reset_token": {
            "$type": "string"
        }
    }
)


# --------------------------------------------------
# HELPER FUNCTIONS
# --------------------------------------------------

def user_to_dict(user):
    return {
        "id": user["_id"],
        "name": user["name"],
        "email": user["email"],
        "role": user.get("role", "customer")
    }


def get_next_user_id():
    last_user = users_collection.find_one(
        sort=[("_id", -1)]
    )

    if last_user:
        return last_user["_id"] + 1

    return 1


# --------------------------------------------------
# REGISTER
# --------------------------------------------------

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    required_fields = [
        "name",
        "email",
        "password"
    ]

    for field in required_fields:

        if not data.get(field):
            return jsonify({
                "message": f"{field} is required"
            }), 400

    name = data["name"].strip()
    email = data["email"].strip().lower()
    password = data["password"]

    # Check existing user
    existing_user = users_collection.find_one({
        "email": email
    })

    if existing_user:
        return jsonify({
            "message": "Email already registered"
        }), 409

    # Generate numeric ID
    user_id = get_next_user_id()

    user = {
        "_id": user_id,
        "name": name,
        "email": email,
        "password_hash": generate_password_hash(password),
        "role": "customer",
        "reset_token": None,
        "reset_token_expires": None
    }

    users_collection.insert_one(user)

    return jsonify({
        "message": "Registration successful",
        "user": user_to_dict(user)
    }), 201


# --------------------------------------------------
# LOGIN
# --------------------------------------------------

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({
            "message": "Email and password are required"
        }), 400

    user = users_collection.find_one({
        "email": email
    })

    if not user:
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    if not check_password_hash(
        user["password_hash"],
        password
    ):
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    access_token = create_access_token(
        identity=str(user["_id"]),
        additional_claims={
            "role": user.get("role", "customer"),
            "email": user["email"]
        }
    )

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": user_to_dict(user)
    }), 200


# --------------------------------------------------
# FORGOT PASSWORD
# --------------------------------------------------

@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():

    data = request.get_json()

    if not data or not data.get("email"):
        return jsonify({
            "message": "Email is required"
        }), 400

    email = data["email"].strip().lower()

    user = users_collection.find_one({
        "email": email
    })

    # Do not reveal whether email exists
    if not user:
        return jsonify({
            "message": (
                "If the email is registered, "
                "a password reset link has been generated."
            )
        }), 200

    reset_token = secrets.token_urlsafe(32)

    reset_token_expires = (
        datetime.now(timezone.utc)
        + timedelta(minutes=30)
    )

    users_collection.update_one(
        {
            "_id": user["_id"]
        },
        {
            "$set": {
                "reset_token": reset_token,
                "reset_token_expires": reset_token_expires
            }
        }
    )

    # Development only.
    # Later this token will be sent through email.
    return jsonify({
        "message": (
            "If the email is registered, "
            "a password reset link has been generated."
        ),
        "reset_token": reset_token
    }), 200


# --------------------------------------------------
# RESET PASSWORD
# --------------------------------------------------

@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    token = data.get("token", "").strip()
    new_password = data.get("new_password", "")

    if not token or not new_password:
        return jsonify({
            "message": "Token and new password are required"
        }), 400

    if len(new_password) < 8:
        return jsonify({
            "message": "Password must be at least 8 characters"
        }), 400

    user = users_collection.find_one({
        "reset_token": token
    })

    if not user:
        return jsonify({
            "message": "Invalid or expired reset token"
        }), 400

    expires = user.get("reset_token_expires")

    if not expires:
        return jsonify({
            "message": "Invalid or expired reset token"
        }), 400

    # MongoDB/PyMongo normally returns UTC datetime
    # without timezone information.
    if expires.tzinfo is None:
        expires = expires.replace(
            tzinfo=timezone.utc
        )

    if expires < datetime.now(timezone.utc):

        users_collection.update_one(
            {
                "_id": user["_id"]
            },
            {
                "$set": {
                    "reset_token": None,
                    "reset_token_expires": None
                }
            }
        )

        return jsonify({
            "message": "Invalid or expired reset token"
        }), 400

    # Update password and invalidate token
    users_collection.update_one(
        {
            "_id": user["_id"]
        },
        {
            "$set": {
                "password_hash": generate_password_hash(
                    new_password
                ),
                "reset_token": None,
                "reset_token_expires": None
            }
        }
    )

    return jsonify({
        "message": "Password reset successful"
    }), 200


# --------------------------------------------------
# ADMIN LOGIN
# --------------------------------------------------

@auth_bp.route("/admin-login", methods=["POST"])
def admin_login():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({
            "message": "Email and password are required"
        }), 400

    user = users_collection.find_one({
        "email": email
    })

    if not user:
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    if not check_password_hash(
        user["password_hash"],
        password
    ):
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    if user.get("role") != "admin":
        return jsonify({
            "message": "Admin access required"
        }), 403

    access_token = create_access_token(
        identity=str(user["_id"]),
        additional_claims={
            "role": user["role"],
            "email": user["email"]
        }
    )

    return jsonify({
        "message": "Admin login successful",
        "access_token": access_token,
        "user": user_to_dict(user)
    }), 200