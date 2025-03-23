from flask import Blueprint, request, jsonify
import urllib.parse

from utils import get_db_conn

stadium = Blueprint('stadium', __name__)

@stadium.route('/stadium', methods=['POST'])
def create_stadium():
    data = request.get_json()
    number = data['number']
    name = data['name']
    country = data['country']
    city = data['city']
    capacity = data['capacity']
    
    insert_query = "INSERT INTO Stadium (number, name, country, city, capacity) VALUES (%s, %s, %s, %s, %s)"

    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(insert_query, (number, name, country, city, capacity))
    cur.close()
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Stadium created"}), 201


@stadium.route('/stadium', methods=['GET'])
def get_stadiums():
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(""" 
        SELECT *
        FROM Stadium
        ORDER BY number ASC 
    """)
    stadiums = cur.fetchall()
    cur.close()
    conn.close()
    
    stadium_list = []
    for stadium in stadiums:
        stadium_dict = {
            "number": stadium[0],
            "name": stadium[1],
            "country": stadium[2],
            "city": stadium[3],
            "capacity": stadium[4]
        }
        stadium_list.append(stadium_dict)
    
    return jsonify(stadium_list), 200


@stadium.route('/stadium/<number>', methods=['PATCH'])
def update_stadium(number):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM Stadium WHERE number = %s", (number,))
    stadium = cur.fetchone()
    cur.close()
    conn.close()
    if stadium is None:
        return jsonify({"error": "Stadium not found"}), 404
    
    data = request.get_json()

    update_fields = []
    update_values = []

    if  data['name'] != "":
        update_fields.append("name = %s")
        update_values.append(data['name'])

    if  data['country'] != "":
        update_fields.append("country = %s")
        update_values.append(data['country'])

    if  data['city'] != "":
        update_fields.append("city = %s")
        update_values.append(data['city'])

    if  data['capacity'] != "":
        update_fields.append("capacity = %s")
        update_values.append(data['capacity'])

    update_query = f"UPDATE Stadium SET {', '.join(update_fields)} WHERE number = %s"
    update_values.append(number)

    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(update_query, update_values)
    cur.close()
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Stadium updated"}), 200


@stadium.route('/stadium/<number>', methods=['DELETE'])
def delete_stadium(number):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM Stadium WHERE number = %s", (number,))
    stadium = cur.fetchone()
    cur.close()
    conn.close()
    if stadium is None:
        return jsonify({"error": "Stadium not found"}), 404

    delete_query = "DELETE FROM Stadium WHERE number = %s"

    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(delete_query, (number,))
    cur.close()
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Stadium deleted"}), 200
