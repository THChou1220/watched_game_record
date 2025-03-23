from flask import Blueprint, request, jsonify

from utils import get_db_conn

homerun = Blueprint('homerun', __name__)

@homerun.route('/homerun', methods=['POST'])
def create_homerun():
    data = request.get_json()
    number = data['number']
    game_number = data['game_number']
    player_team = data['player_team']
    player_name = data['player_name']
    RBI = data['RBI']
    
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM Game WHERE number = %s", (game_number,))
    game = cur.fetchone()
    cur.close()
    conn.close()
    if game is None:
        return jsonify({"error": "Game not found"}), 404

    insert_query = "INSERT INTO Homerun (number, game_number, player_team, player_name, RBI) VALUES (%s, %s, %s, %s, %s)"

    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(insert_query, (number, game_number, player_team, player_name, RBI))
    cur.close()
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Homerun created"}), 201


@homerun.route('/homerun', methods=['GET'])
def get_homeruns():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(""" 
        SELECT 
            Homerun.number,
            Homerun.game_number as game,
            Stadium.name as stadium,
            Homerun.player_team as team,
            Homerun.player_name as player,
            Homerun.RBI
        FROM Homerun 
            JOIN Game ON Game.number = Homerun.game_number
            JOIN Stadium ON Stadium.number = Game.stadium_number 
        ORDER BY Homerun.number ASC 
    """)
    homeruns = cur.fetchall()
    cur.close()
    conn.close()
    
    homerun_list = []
    for homerun in homeruns:
        homerun_dict = {
            "number": homerun[0],
            "game": homerun[1],
            "stadium": homerun[2],
            "team": homerun[3],
            "player": homerun[4],
            "RBI": homerun[5],
        }
        homerun_list.append(homerun_dict)
    
    return jsonify(homerun_list), 200


@homerun.route('/homerun/<number>', methods=['PATCH'])
def update_homerun(number):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM Homerun WHERE number = %s", (number,))
    homerun = cur.fetchone()
    cur.close()
    conn.close()
    if homerun is None:
        return jsonify({"error": "Homerun not found"}), 404
    
    data = request.get_json()

    update_fields = []
    update_values = []

    if  data['game_number'] != "":
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute("SELECT 1 FROM Game WHERE number = %s", (data['game_number'],))
        game = cur.fetchone()
        cur.close()
        conn.close()
        if game is None:
            return jsonify({"error": "Game not found"}), 404
        update_fields.append("game_number = %s")
        update_values.append(data['game_number'])

    if  data['player_team'] != "":
        update_fields.append("player_team = %s")
        update_values.append(data['player_team'])
    
    if  data['player_name'] != "":
        update_fields.append("player_name = %s")
        update_values.append(data['player_name'])
    
    if  data['RBI'] != "":
        update_fields.append("RBI = %s")
        update_values.append(data['RBI'])

    update_query = f"UPDATE Homerun SET {', '.join(update_fields)} WHERE number = %s"
    update_values.append(number)

    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(update_query, update_values)
    cur.close()
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Homerun updated"}), 200


@homerun.route('/homerun/<number>', methods=['DELETE'])
def delete_homerun(number):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM Homerun WHERE number = %s", (number,))
    homerun = cur.fetchone()
    cur.close()
    conn.close()
    if homerun is None:
        return jsonify({"error": "Homerun not found"}), 404

    delete_query = "DELETE FROM Homerun WHERE number = %s"

    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(delete_query, (number,))
    cur.close()
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Homerun deleted"}), 200
