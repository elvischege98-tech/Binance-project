from flask import Flask, jsonify, request, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import sqlite3
from pathlib import Path

app = Flask(__name__)
# =====================================================
# AUTHENTICATION CONFIGURATION
# =====================================================

app.config["SECRET_KEY"] = "joint-invest-development-secret-key"

CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:5173"]
)

# Path to the SQLite database
BASE_DIR = Path(__file__).resolve().parent.parent
DATABASE = BASE_DIR / "joint_invest.db"


def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

# =====================================================
# AUTHENTICATION
# =====================================================

@app.route("/api/auth/signup", methods=["POST"])
def signup():
    data = request.get_json()

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    # Validate fields
    if not name or not email or not password:
        return jsonify({
            "error": "Name, email and password are required"
        }), 400

    if len(password) < 6:
        return jsonify({
            "error": "Password must be at least 6 characters"
        }), 400

    conn = get_db_connection()

    try:
        # Check whether email already exists
        existing_user = conn.execute("""
            SELECT id
            FROM users
            WHERE email = ?
        """, (email,)).fetchone()

        if existing_user:
            return jsonify({
                "error": "An account with this email already exists"
            }), 409

        # Hash password
        password_hash = generate_password_hash(password)

        # Create user
        cursor = conn.execute("""
            INSERT INTO users (
                name,
                email,
                password_hash
            )
            VALUES (?, ?, ?)
        """, (
            name,
            email,
            password_hash
        ))

        conn.commit()

        user_id = cursor.lastrowid

        # Log the user in immediately
        session["user_id"] = user_id

        return jsonify({
            "message": "Account created successfully",
            "user": {
                "id": user_id,
                "name": name,
                "email": email
            }
        }), 201

    except sqlite3.IntegrityError:
        conn.rollback()

        return jsonify({
            "error": "Email is already registered"
        }), 409

    finally:
        conn.close()


@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({
            "error": "Email and password are required"
        }), 400

    conn = get_db_connection()

    try:
        user = conn.execute("""
            SELECT
                id,
                name,
                email,
                password_hash
            FROM users
            WHERE email = ?
        """, (email,)).fetchone()

        if user is None:
            return jsonify({
                "error": "Invalid email or password"
            }), 401

        # Check password
        if not check_password_hash(user["password_hash"], password):
            return jsonify({
                "error": "Invalid email or password"
            }), 401

        # Store user ID in session
        session["user_id"] = user["id"]

        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            }
        })

    finally:
        conn.close()


@app.route("/api/auth/logout", methods=["POST"])
def logout():
    session.clear()

    return jsonify({
        "message": "Logged out successfully"
    })


@app.route("/api/auth/me", methods=["GET"])
def current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "authenticated": False
        }), 401

    conn = get_db_connection()

    try:
        user = conn.execute("""
            SELECT
                id,
                name,
                email,
                created_at
            FROM users
            WHERE id = ?
        """, (user_id,)).fetchone()

        if user is None:
            session.clear()

            return jsonify({
                "authenticated": False
            }), 401

        return jsonify({
            "authenticated": True,
            "user": dict(user)
        })

    finally:
        conn.close()

# =====================================================
# LOGIN REQUIRED DECORATOR
# =====================================================

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):

        if "user_id" not in session:
            return jsonify({
                "error": "Authentication required"
            }), 401

        return f(*args, **kwargs)

    return decorated_function        


# =====================================================
# HOME
# =====================================================

@app.route("/")
def home():
    return jsonify({
        "message": "Joint Invest API is running"
    })


# =====================================================
# GET ALL RECORDS
# =====================================================

@app.route("/api/records", methods=["GET"])
def get_records():
    conn = get_db_connection()

    records = conn.execute("""
        SELECT
            records.id,
            records.date,
            members.id AS member_id,
            members.name AS person,
            records.type,
            records.direction,
            records.category,
            records.description,
            records.amount
        FROM records
        JOIN members
            ON records.member_id = members.id
        ORDER BY records.date DESC, records.id DESC
    """).fetchall()

    conn.close()

    return jsonify([dict(record) for record in records])


# =====================================================
# GET ONE RECORD
# =====================================================

@app.route("/api/records/<int:record_id>", methods=["GET"])
def get_record(record_id):
    conn = get_db_connection()

    record = conn.execute("""
        SELECT
            records.id,
            records.date,
            members.id AS member_id,
            members.name AS person,
            records.type,
            records.direction,
            records.category,
            records.description,
            records.amount
        FROM records
        JOIN members
            ON records.member_id = members.id
        WHERE records.id = ?
    """, (record_id,)).fetchone()

    conn.close()

    if record is None:
        return jsonify({
            "error": "Record not found"
        }), 404

    return jsonify(dict(record))


# =====================================================
# CREATE RECORD
# =====================================================

@app.route("/api/records", methods=["POST"])
def create_record():
    data = request.get_json()

    required_fields = [
        "date",
        "member_id",
        "type",
        "direction",
        "category",
        "description",
        "amount"
    ]

    # Check required fields
    missing_fields = [
        field for field in required_fields
        if field not in data
    ]

    if missing_fields:
        return jsonify({
            "error": "Missing required fields",
            "fields": missing_fields
        }), 400

    conn = get_db_connection()

    try:
        cursor = conn.execute("""
            INSERT INTO records (
                date,
                member_id,
                type,
                direction,
                category,
                description,
                amount
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            data["date"],
            data["member_id"],
            data["type"],
            data["direction"],
            data["category"],
            data["description"],
            data["amount"]
        ))

        conn.commit()

        record_id = cursor.lastrowid

        record = conn.execute("""
            SELECT
                records.id,
                records.date,
                members.id AS member_id,
                members.name AS person,
                records.type,
                records.direction,
                records.category,
                records.description,
                records.amount
            FROM records
            JOIN members
                ON records.member_id = members.id
            WHERE records.id = ?
        """, (record_id,)).fetchone()

        return jsonify(dict(record)), 201

    except sqlite3.IntegrityError as error:
        conn.rollback()

        return jsonify({
            "error": str(error)
        }), 400

    finally:
        conn.close()


# =====================================================
# UPDATE RECORD
# =====================================================

@app.route("/api/records/<int:record_id>", methods=["PUT"])
def update_record(record_id):
    data = request.get_json()

    required_fields = [
        "date",
        "member_id",
        "type",
        "direction",
        "category",
        "description",
        "amount"
    ]

    missing_fields = [
        field for field in required_fields
        if field not in data
    ]

    if missing_fields:
        return jsonify({
            "error": "Missing required fields",
            "fields": missing_fields
        }), 400

    conn = get_db_connection()

    try:
        existing_record = conn.execute("""
            SELECT id
            FROM records
            WHERE id = ?
        """, (record_id,)).fetchone()

        if existing_record is None:
            return jsonify({
                "error": "Record not found"
            }), 404

        conn.execute("""
            UPDATE records
            SET
                date = ?,
                member_id = ?,
                type = ?,
                direction = ?,
                category = ?,
                description = ?,
                amount = ?
            WHERE id = ?
        """, (
            data["date"],
            data["member_id"],
            data["type"],
            data["direction"],
            data["category"],
            data["description"],
            data["amount"],
            record_id
        ))

        conn.commit()

        record = conn.execute("""
            SELECT
                records.id,
                records.date,
                members.id AS member_id,
                members.name AS person,
                records.type,
                records.direction,
                records.category,
                records.description,
                records.amount
            FROM records
            JOIN members
                ON records.member_id = members.id
            WHERE records.id = ?
        """, (record_id,)).fetchone()

        return jsonify(dict(record))

    except sqlite3.IntegrityError as error:
        conn.rollback()

        return jsonify({
            "error": str(error)
        }), 400

    finally:
        conn.close()


# =====================================================
# DELETE RECORD
# =====================================================

@app.route("/api/records/<int:record_id>", methods=["DELETE"])
def delete_record(record_id):
    conn = get_db_connection()

    try:
        existing_record = conn.execute("""
            SELECT id
            FROM records
            WHERE id = ?
        """, (record_id,)).fetchone()

        if existing_record is None:
            return jsonify({
                "error": "Record not found"
            }), 404

        conn.execute("""
            DELETE FROM records
            WHERE id = ?
        """, (record_id,))

        conn.commit()

        return jsonify({
            "message": "Record deleted successfully",
            "id": record_id
        })

    finally:
        conn.close()


# =====================================================
# RUN SERVER
# =====================================================

if __name__ == "__main__":
    app.run(debug=True, port=5000)