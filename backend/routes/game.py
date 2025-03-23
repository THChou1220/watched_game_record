from flask import Blueprint, request, jsonify

from utils import get_db_conn

game = Blueprint('game', __name__)

@game.route('/game', methods=['POST'])
def create_game():
    data = request.get_json()
    number = data['number']
    date = data['date']
    event = data['event']
    stadium_number = data['stadium_number']
    away_team = data['away_team']
    away_score = data['away_score']
    home_team = data['home_team']
    home_score = data['home_score']
    
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM Stadium WHERE number = %s", (stadium_number,))
    stadium = cur.fetchone()
    cur.close()
    conn.close()
    if stadium is None:
        return jsonify({"error": "Stadium not found"}), 404

    insert_query = "INSERT INTO Game (number, date, event, stadium_number, away_team, away_score, home_team, home_score) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"

    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(insert_query, (number, date, event, stadium_number, away_team, away_score, home_team, home_score))
    cur.close()
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Game created"}), 201


@game.route('/game', methods=['GET'])
def get_games():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("""
        SELECT 
            Game.number,
            DATE_FORMAT(Game.date, '%Y-%m-%d') as date,
            DAYNAME(Game.date) as weekday,
            Game.event,
            Stadium.name as stadium,
            Game.away_team,
            Game.away_score,
            Game.home_team,
            Game.home_score,
            COUNT(Homerun.number) as HR
        FROM Game 
            LEFT JOIN Stadium ON Stadium.number = Game.stadium_number
            LEFT JOIN Homerun ON Homerun.game_number = Game.number
        GROUP BY Game.number 
        ORDER BY Game.number ASC
    """)
    games = cur.fetchall()
    cur.close()
    conn.close()
    
    game_list = []
    for game in games:
        game_dict = {
            "number": game[0],
            "date": game[1],
            "weekday": game[2],
            "event": game[3],
            "stadium": game[4],
            "away_team": game[5],
            "away_score": game[6],
            "home_team": game[7],
            "home_score": game[8],
            "HR": game[9]
        }
        game_list.append(game_dict)
    
    return jsonify(game_list), 200


@game.route('/game/<number>', methods=['PATCH'])
def update_game(number):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM Game WHERE number = %s", (number,))
    game = cur.fetchone()
    cur.close()
    conn.close
    if game is None:
        return jsonify({"error": "Game not found"}), 404
    
    data = request.get_json()
    
    update_fields = []
    update_values = []

    if  data['date'] != "":
        update_fields.append("date = %s")
        update_values.append(data['date'])
    
    if  data['event'] != "":
        update_fields.append("event = %s")
        update_values.append(data['event'])
    
    if  data['stadium_number'] != "":
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute("SELECT 1 FROM Stadium WHERE number = %s", (data['stadium_number'],))
        stadium = cur.fetchone()
        cur.close()
        conn.close()
        if stadium is None:
            return jsonify({"error": "Stadium not found"}), 404
        update_fields.append("stadium_number = %s")
        update_values.append(data['stadium_number'])
    
    if  data['away_team'] != "":
        update_fields.append("away_team = %s")
        update_values.append(data['away_team'])
    
    if  data['away_score'] != "":
        update_fields.append("away_score = %s")
        update_values.append(data['away_score'])
    
    if  data['home_team'] != "":
        update_fields.append("home_team = %s")
        update_values.append(data['home_team'])
    
    if  data['home_score'] != "":
        update_fields.append("home_score = %s")
        update_values.append(data['home_score'])

    update_query = f"UPDATE Game SET {', '.join(update_fields)} WHERE number = %s"
    update_values.append(number)

    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(update_query, update_values)
    cur.close()
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Game updated"}), 200


@game.route('/game/<number>', methods=['DELETE'])
def delete_game(number):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM Game WHERE number = %s", (number,))
    game = cur.fetchone()
    cur.close()
    conn.close()
    if game is None:
        return jsonify({"error": "Game not found"}), 404

    delete_query = "DELETE FROM Game WHERE number = %s"
    
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(delete_query, (number,))
    cur.close()
    conn.commit()
    conn.close
    
    return jsonify({"message": "Game deleted"}), 200
