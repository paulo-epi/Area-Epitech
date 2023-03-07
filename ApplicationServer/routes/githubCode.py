from flask import Flask, request, jsonify
from __main__ import app, dbObject
from flask_cors import cross_origin
import requests
import json

# app = Flask(__name__)

@app.route('/get_access_token', methods=['GET'])
@cross_origin()
def get_access_token():
    client_id = request.args.get('client_id')
    client_secret = request.args.get('client_secret')
    code = request.args.get('code')

    response = requests.post('https://github.com/login/oauth/access_token',
                                   data={'client_id': client_id, 'client_secret': client_secret, 'code': code},
                                   headers={'Accept': 'application/json'})

    if response.ok:
        return response.json()
    else:
        print("response pas ok")
        print(response.json())
        return json.dumps('Error: ' + response.text)


