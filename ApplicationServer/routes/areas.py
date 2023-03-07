from flask import request
from __main__ import app, dbObject
from auth import authentification, auth_fail, get_user_id
from flask_cors import cross_origin
from jwt import decode
import json

def make_action(service, description):
    return {"action":{"service":service, "description":description}}

def make_reaction(service, description):
    return {"reaction":{"service":service, "description":description}}

@app.route("/areas", methods=['GET'])
@cross_origin()
def area_areas():
    if not authentification(request.headers):
        return auth_fail()

    user_id = get_user_id()
    data = dbObject.get_user_area(user_id)
    res = []
    for entry in data:
        res.append({
            "area_id":entry[0],
            "action":{
                "name":entry[1],
                "data":entry[2]
            },
            "reaction":{
                "name":entry[3],
                "data":entry[4]
            }})
    str_areas = json.dumps(res)
    return (str_areas)

@app.route('/add_area', methods=['POST'])
@cross_origin()
def add_area():
    if not authentification(request.headers):
        return auth_fail()
    action_id = request.form["action_id"]
    action_data = request.form["action_data"]
    reaction_id = request.form["reaction_id"]
    reaction_data = request.form["reaction_data"]
    user_id = decode(request.headers["jwt"], key="la_clef_des_tokens", algorithms=["HS256"])["id"]
    dbObject.insert_area(user_id, action_id, action_data, reaction_id, reaction_data)
    return ({"success":True})

@app.route('/remove_area', methods=['DELETE'])
@cross_origin()
def remove_area():
    if not authentification(request.headers):
        return auth_fail()
    id = request.form["area_id"]
    user_id = decode(request.headers["jwt"], key="la_clef_des_tokens", algorithms=["HS256"])["id"]
    dbObject.remove_area(id, user_id)
    return ({"success":True})
