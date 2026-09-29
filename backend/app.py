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


@app.route("/")
def home():
    return jsonify({
        "message": "Joint Invest API is running"
    })


@app.route("/api/records", methods=["GET"])
def get_records():
    conn = get_db_connection()

    records = conn.execute("""
        SELECT
            records.id,
            records.date,
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


if __name__ == "__main__":
    app.run(debug=True, port=5000)