from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

from extensions import db
from routes.product_routes import product_bp
from routes.order_routes import order_bp


app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "change-this-secret-key"
jwt = JWTManager(app)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE_PATH = os.path.join(BASE_DIR, "crochet_oasis.db")

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DATABASE_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# Initialize SQLAlchemy with this Flask application
db.init_app(app)

# Enable CORS
CORS(app)
from models import User, Product, Order, OrderItem
from routes.product_routes import product_bp
from routes.auth_routes import auth_bp


app.register_blueprint(product_bp)
app.register_blueprint(order_bp)
app.register_blueprint(auth_bp)


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "ok",
        "message": "Crochet Oasis API is running"
    })


# Import models after db is initialized
from models import User, Product, Order, OrderItem


# Create database tables
with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )