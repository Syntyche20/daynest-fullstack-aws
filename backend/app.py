import os
import sqlite3
import psycopg2 # Ajoute 'psycopg2-binary' dans ton requirements.txt
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- CONFIGURATION DB ---
# On vérifie si une URL de base de données AWS existe, sinon on utilise SQLite
DATABASE_URL = os.environ.get('DATABASE_URL') 

def get_db():
    if DATABASE_URL:
        # Connexion à ton RDS PostgreSQL
        return psycopg2.connect(DATABASE_URL)
    else:
        # Connexion locale SQLite
        return sqlite3.connect("database.db")

def init_db():
    conn = get_db()
    cur = conn.cursor()
    # Syntaxe compatible PostgreSQL et SQLite
    cur.execute("""
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            done BOOLEAN DEFAULT FALSE
        )
    """)
    conn.commit()
    conn.close()

# ... (tes routes get_todos, add_todo, etc. restent identiques) ...
# Note : PostgreSQL utilise %s au lieu de ? pour les requêtes, 
# mais SQLite préfère ?. Pour GitHub, reste sur SQLite si c'est juste un test.

if __name__ == "__main__":
    init_db()
    # TRÈS IMPORTANT : 0.0.0.0 pour que Docker fonctionne sur AWS
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)