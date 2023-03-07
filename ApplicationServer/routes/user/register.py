from flask import request
from __main__ import app, dbObject
from area_hash import area_hash
from flask_cors import cross_origin

@app.route("/register", methods = ['POST'])
@cross_origin()
def area_register():
    email = request.form["email"]
    password_hash = area_hash(request.form["password"])
    new_account = {}
    new_account["email"] = email
    new_account["password_hash"] = password_hash
    print("New Account:", new_account)
    dbObject.insert_user(email, password_hash)
    return new_account
