import mysql.connector

def get_db_conn():
    conn = mysql.connector.connect(
        host="127.0.0.1",
        user="root",            # your MySQL username
        password="cth20021220", # your MySQL password
        database="viewed_game"
    )
    return conn