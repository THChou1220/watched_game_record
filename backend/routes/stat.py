from flask import Blueprint, jsonify

from utils import get_db_conn

stat = Blueprint('stat', __name__)

@stat.route('/stat/total_record', methods=['GET'])
def get_total_record():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(""" 
        SELECT 
            team,
            SUM(WIN + TIE + LOSS) AS G,
            SUM(WIN) AS W,
            SUM(TIE) AS T,
            SUM(LOSS) AS L
        FROM (
            SELECT 
                home_team AS team,
                SUM(CASE WHEN home_score > away_score THEN 1 ELSE 0 END) AS WIN,
                SUM(CASE WHEN home_score = away_score THEN 1 ELSE 0 END) AS TIE,
                SUM(CASE WHEN home_score < away_score THEN 1 ELSE 0 END) AS LOSS
            FROM Game
            GROUP BY home_team
            UNION
            SELECT 
                away_team AS team,
                SUM(CASE WHEN away_score > home_score THEN 1 ELSE 0 END) AS WIN,
                SUM(CASE WHEN away_score = home_score THEN 1 ELSE 0 END) AS TIE,
                SUM(CASE WHEN away_score < home_score THEN 1 ELSE 0 END) AS LOSS
            FROM Game
            GROUP BY away_team
        ) AS Result
        GROUP BY team
        ORDER BY SUM(WIN + LOSS) DESC, SUM(WIN) DESC, SUM(LOSS) ASC, team ASC
    """)
    record = cur.fetchall()
    cur.close()
    conn.close()
    
    record_list = []
    for r in record:
        record_dict = {
            "team": r[0],
            "G": r[1],
            "W": r[2],
            "T": r[3],
            "L": r[4]
        }
        record_list.append(record_dict)
    
    return jsonify(record_list), 200


@stat.route('/stat/home_record', methods=['GET'])
def get_home_record():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(""" 
        SELECT 
            team,
            SUM(WIN + TIE + LOSS) AS G,
            SUM(WIN) AS W,
            SUM(TIE) AS T,
            SUM(LOSS) AS L
        FROM (
            SELECT 
                home_team AS team,
                SUM(CASE WHEN home_score > away_score THEN 1 ELSE 0 END) AS WIN,
                SUM(CASE WHEN home_score = away_score THEN 1 ELSE 0 END) AS TIE,
                SUM(CASE WHEN home_score < away_score THEN 1 ELSE 0 END) AS LOSS
            FROM Game
            GROUP BY home_team
        ) AS Result
        GROUP BY team
        ORDER BY SUM(WIN + LOSS) DESC, SUM(WIN) DESC, SUM(LOSS) ASC, team ASC;
    """)
    record = cur.fetchall()
    cur.close()
    conn.close()
    
    record_list = []
    for r in record:
        record_dict = {
            "team": r[0],
            "G": r[1],
            "W": r[2],
            "T": r[3],
            "L": r[4]
        }
        record_list.append(record_dict)
    
    return jsonify(record_list), 200


@stat.route('/stat/away_record', methods=['GET'])
def get_away_record():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(""" 
        SELECT 
            team,
            SUM(WIN + TIE + LOSS) AS G,
            SUM(WIN) AS W,
            SUM(TIE) AS T,
            SUM(LOSS) AS L
        FROM (
            SELECT 
                away_team AS team,
                SUM(CASE WHEN away_score > home_score THEN 1 ELSE 0 END) AS WIN,
                SUM(CASE WHEN away_score = home_score THEN 1 ELSE 0 END) AS TIE,
                SUM(CASE WHEN away_score < home_score THEN 1 ELSE 0 END) AS LOSS
            FROM Game
            GROUP BY away_team
        ) AS Result
        GROUP BY team
        ORDER BY SUM(WIN + LOSS) DESC, SUM(WIN) DESC, SUM(LOSS) ASC, team ASC;
    """)
    record = cur.fetchall()
    cur.close()
    conn.close()
    
    record_list = []
    for r in record:
        record_dict = {
            "team": r[0],
            "G": r[1],
            "W": r[2],
            "T": r[3],
            "L": r[4]
        }
        record_list.append(record_dict)
    
    return jsonify(record_list), 200


@stat.route('/stat/team_HR', methods=['GET'])
def get_team_HR():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(""" 
        SELECT 
	        player_team AS team,
            COUNT(*) AS quantity
        FROM Homerun
        GROUP BY player_team
        ORDER BY COUNT(*) DESC, player_team ASC
    """)
    data = cur.fetchall()
    cur.close()
    conn.close()
    
    data_list = []
    for d in data:
        data_dict = {
            "team": d[0],
            "quantity": d[1]
        }
        data_list.append(data_dict)
    
    return jsonify(data_list), 200


@stat.route('/stat/player_HR', methods=['GET'])
def get_player_HR():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(""" 
        SELECT 
	        player_name AS name,
            COUNT(*) AS quantity
        FROM Homerun
        GROUP BY player_name
        ORDER BY COUNT(*) DESC, player_name ASC
    """)
    data = cur.fetchall()
    cur.close()
    conn.close()
    
    data_list = []
    for d in data:
        data_dict = {
            "name": d[0],
            "quantity": d[1]
        }
        data_list.append(data_dict)
    
    return jsonify(data_list), 200


@stat.route('/stat/game_event', methods=['GET'])
def get_game_event():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(""" 
        SELECT 
	        event,
            COUNT(*) AS game
        FROM Game
        GROUP BY event
        ORDER BY event ASC
    """)
    data = cur.fetchall()
    cur.close()
    conn.close()
    
    data_list = []
    for d in data:
        data_dict = {
            "event": d[0],
            "game": d[1]
        }
        data_list.append(data_dict)
    
    return jsonify(data_list), 200


@stat.route('/stat/game_year', methods=['GET'])
def get_game_year():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(""" 
        SELECT 
	        YEAR(date) as year,
            COUNT(*) AS game
        FROM Game
        GROUP BY YEAR(date)
        ORDER BY YEAR(date) ASC
    """)
    data = cur.fetchall()
    cur.close()
    conn.close()
    
    data_list = []
    for d in data:
        data_dict = {
            "year": d[0],
            "game": d[1]
        }
        data_list.append(data_dict)
    
    return jsonify(data_list), 200
