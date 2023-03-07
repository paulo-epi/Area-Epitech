from __main__ import app, dbObject
from flask_cors import cross_origin
import json

@app.route('/get_reactions', methods=['GET'])
@cross_origin()
def area_reactions():
    reactions = dbObject.select("reaction")
    str_reactions = json.dumps(reactions)
    return str_reactions
