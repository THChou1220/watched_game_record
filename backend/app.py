from flask import Flask, jsonify
from flask_cors import CORS

from routes.stadium import stadium
from routes.game import game
from routes.homerun import homerun
from routes.stat import stat

from utils import get_db_conn

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_status():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("""
        SELECT 
            Stadium.name as stadium, 
            COUNT(DISTINCT Game.number) as game, 
            COUNT(Homerun.number) as HR 
        FROM Stadium 
            JOIN Game ON Stadium.number = Game.stadium_number 
            LEFT JOIN Homerun ON Homerun.game_number = Game.number 
        GROUP BY Stadium.name 
        ORDER BY 
            COUNT(DISTINCT Game.number) DESC, 
            COUNT(Homerun.number) DESC
    """)
    status = cur.fetchall()
    conn.close()
    
    stat_list = []
    for stat in status:
        stat_dict = {
            "stadium": stat[0],
            "game": stat[1],
            "HR": stat[2],
        }
        stat_list.append(stat_dict)
    
    return jsonify(stat_list), 200

app.register_blueprint(stadium)
app.register_blueprint(game)
app.register_blueprint(homerun)
app.register_blueprint(stat)

if __name__ == '__main__':
    print("App running")
    app.run(debug=True)
