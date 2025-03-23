import mysql.connector

def get_db_conn():
    conn = mysql.connector.connect(
        host="127.0.0.1",
        user="",            # your MySQL username
        password="", # your MySQL password
        database="viewed_game"
    )
    return conn
