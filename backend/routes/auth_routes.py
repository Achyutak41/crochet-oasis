from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token
from extensions import db
from models import User
import secrets
from datetime import datetime, timedelta, timezone

auth_bp = Blueprint("auth_bp", __name__, url_prefix="/api/auth")


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Request body is required"}), 400

    required_fields = ["name", "email", "password"]

    for field in required_fields:
        if not data.get(field):
            return jsonify({"message": f"{field} is required"}), 400

    name = data["name"].strip()
    email = data["email"].strip().lower()
    password = data["password"]

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"message": "Email already registered"}), 409

    user = User(
        name=name,
        email=email,
        password_hash=generate_password_hash(password),
        role="customer"
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Registration successful",
        "user": user.to_dict()
    }), 201

from werkzeug.security import check_password_hash
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Request body is required"}), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid email or password"}), 401

    access_token = create_access_token(
    identity=str(user.id),
    additional_claims={
        "role": user.role,
        "email": user.email
    }
)

    return jsonify({
    "message": "Login successful",
    "access_token": access_token,
    "user": user.to_dict()
}), 200

@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json()

    if not data or not data.get("email"):
        return jsonify({"message": "Email is required"}), 400

    email = data["email"].strip().lower()

    user = User.query.filter_by(email=email).first()

    # Don't reveal whether an email exists.
    if not user:
        return jsonify({
            "message": "If the email is registered, a password reset link has been generated."
        }), 200

    reset_token = secrets.token_urlsafe(32)

    user.reset_token = reset_token
    user.reset_token_expires = datetime.now(timezone.utc) + timedelta(minutes=30)

    db.session.commit()

    # Development only.
    # Later this token will be sent through email.
    return jsonify({
        "message": "If the email is registered, a password reset link has been generated.",
        "reset_token": reset_token
    }), 200


@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Request body is required"}), 400

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

    user = User.query.filter_by(reset_token=token).first()

    if not user:
        return jsonify({
            "message": "Invalid or expired reset token"
        }), 400

    if not user.reset_token_expires:
        return jsonify({
            "message": "Invalid or expired reset token"
        }), 400

    if user.reset_token_expires < datetime.now(timezone.utc):
        user.reset_token = None
        user.reset_token_expires = None
        db.session.commit()

        return jsonify({
            "message": "Invalid or expired reset token"
        }), 400

    user.password_hash = generate_password_hash(new_password)

    # Token can only be used once.
    user.reset_token = None
    user.reset_token_expires = None

    db.session.commit()

    return jsonify({
        "message": "Password reset successful"
    }), 200


@auth_bp.route("/admin-login", methods=["POST"])
def admin_login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Request body is required"}), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid email or password"}), 401

    if user.role != "admin":
        return jsonify({"message": "Admin access required"}), 403

    access_token = create_access_token(
    identity=str(user.id),
    additional_claims={
        "role": user.role,
        "email": user.email
    }
)

    return jsonify({
    "message": "Admin login successful",
    "access_token": access_token,
    "user": user.to_dict()
}), 200