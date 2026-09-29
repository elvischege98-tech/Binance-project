from flask import Flask, jsonify, request
import sqlite3
from pathlib import Path

app = Flask(__name__)

# Path to the SQLite database
BASE_DIR = Path(__file__).resolve().parent.parent
DATABASE = BASE_DIR / "joint_invest.db"


def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


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