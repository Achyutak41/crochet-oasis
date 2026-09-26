from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

from routes.product_routes import product_bp
from routes.order_routes import order_bp
from routes.auth_routes import auth_bp


app = Flask(__name__)

# ==========================================
# JWT
# ==========================================

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")

jwt = JWTManager(app)


# ==========================================
# CORS
# ==========================================

CORS(app)


# ==========================================
# BLUEPRINTS
# ==========================================

app.register_blueprint(product_bp)
app.register_blueprint(order_bp)
app.register_blueprint(auth_bp)


# ==========================================
# HEALTH CHECK
# ==========================================

@app.route("/api/health", methods=["GET"])
def health_check():

    return jsonify({
        "status": "ok",
        "message": "Crochet Oasis API is running"
    })


# ==========================================
# MAIN
# ==========================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )