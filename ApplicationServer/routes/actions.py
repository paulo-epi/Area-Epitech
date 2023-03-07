from __main__ import app, dbObject
from flask_cors import cross_origin
import json

@app.route('/get_actions', methods=['GET'])
@cross_origin()
def area_actions():
    actions = dbObject.select("action")
    str_actions = json.dumps(actions)
    return str_actions
