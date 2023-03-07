from flask import request
from __main__ import app, dbObject
from area_hash import area_hash
import jwt
from flask_cors import cross_origin

key = "la_clef_des_tokens"

def is_item_in_list(names, name):
    for i in names:
        if name == i[0]:
            return True
    return False

@app.route("/login", methods = ['POST'])
@cross_origin()
def area_login():
    email: str = request.form["email"]
    password_hash: str = area_hash(request.form["password"])
    emails = dbObject.get_emails()

    if not is_item_in_list(emails, email):
        return {"success": False, "token":""}

    database_hash = dbObject.get_hashed_password_from(email)

    if (password_hash != database_hash):
        return {"success":False, "token":""}

    user_id = dbObject.get_user_id(email)

    token = jwt.encode({
        "id":user_id,
        "email":email,
        "validity":"2 hours",
        }, key, algorithm="HS256")
    return {"success":True, "token":token}
