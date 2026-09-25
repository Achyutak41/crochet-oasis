from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import os


app = Flask(__name__)

# --------------------------------------------------
# Configuration
# --------------------------------------------------

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

DATABASE_PATH = os.path.join(
    BASE_DIR,
    "crochet_oasis.db"
)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"sqlite:///{DATABASE_PATH}"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# --------------------------------------------------
# Extensions
# --------------------------------------------------

db = SQLAlchemy(app)

CORS(app)


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.route("/api/health", methods=["GET"])
def health_check():

    return jsonify({
        "status": "ok",
        "message": "Crochet Oasis API is running"
    })


# --------------------------------------------------
# Application Entry
# --------------------------------------------------

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )