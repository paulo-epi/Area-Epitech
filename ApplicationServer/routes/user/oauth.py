from __main__ import app, dbObject
from flask import request
from jwt import decode
from flask_cors import cross_origin

@app.route("/add_oauth", methods=["POST"])
@cross_origin()
def add_oauth():
    # init request info
    user_id = decode(request.headers["jwt"], key="la_clef_des_tokens", algorithms=["HS256"])["id"]
    if isinstance(user_id, list):
        user_id = user_id[0][0]
    service_id = request.form["service_id"]
    update = False

    # verify if entry is already in table
    database_entries = dbObject.select("oauth_token", ["user_id", "service_id"])
    for entry in database_entries:
        update = (entry[0] == user_id and str(entry[1]) == service_id)
        if update:
            break

    # prepare tables for sql request
    fields = ["token", "refresh_token", "client_id", "client_secret", "expiry"]
    values = [
        "\"" + request.form["token"] + "\"",
        "\"" + request.form["refresh_token"] + "\"",
        "\"" + request.form["client_id"] + "\"",
        "\"" + request.form["client_secret"] + "\"",
        "\"" + request.form["expiry"] + "\""
    ]

    # update or insert
    if update:
        condition = "user_id = " + str(user_id) + ", service_id = " + str(service_id)
        dbObject.update("oauth_token", fields, values, condition)
        return ({"success":True, "update":True})
    fields.insert(0, "service_id")
    fields.insert(0, "user_id")
    values.insert(0, request.form["service_id"])
    values.insert(0, str(user_id))
    dbObject.insert("oauth_token", fields, values)
    return ({"success":True, "update":False})
