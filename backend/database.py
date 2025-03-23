import mysql.connector

db_config = {
    'host': '127.0.0.1',
    'user': 'root',             # your MySQL username
    'password': 'cth20021220'   # your MySQL password
}

def create_database():
    conn = None
    cur = None
    try:
        conn = mysql.connector.connect(**db_config)
        cur = conn.cursor()

        cur.execute("CREATE DATABASE IF NOT EXISTS viewed_game CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
        cur.execute("USE viewed_game")

        cur.execute("""
            CREATE TABLE IF NOT EXISTS Stadium (
                number INT,
                name VARCHAR(500) NOT NULL,
                country VARCHAR(500) NOT NULL,
                city VARCHAR(500) NOT NULL,
                capacity INT NOT NULL,
                PRIMARY KEY (number)
            )
        """)

        cur.execute("""
            CREATE TABLE IF NOT EXISTS Game (
                number INT,
                date Date NOT NULL,
                event VARCHAR(500) NOT NULL,
                stadium_number INT NOT NULL,
                away_team VARCHAR(500) NOT NULL,
                away_score INT NOT NULL,
                home_team VARCHAR(500) NOT NULL,
                home_score INT NOT NULL,
                PRIMARY KEY (number),
                FOREIGN KEY (stadium_number) REFERENCES Stadium(number)
            )
        """)

        cur.execute("""
            CREATE TABLE IF NOT EXISTS Homerun (
                number INT,
                game_number INT NOT NULL,
                player_team VARCHAR(500) NOT NULL,
                player_name VARCHAR(500) NOT NULL,
                RBI INT NOT NULL,
                PRIMARY KEY (number),
                FOREIGN KEY (game_number) REFERENCES Game(number)
            )
        """)  

        conn.commit()
        print("Database and tables created")
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    create_database()
