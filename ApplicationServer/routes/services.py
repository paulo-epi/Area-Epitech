from __main__ import app, dbObject
from flask_cors import cross_origin

# 0 google
# 1 discord
# 2 microsoft
# 3 github
# 4 meta

@app.route("/get_services", methods=["GET"])
@cross_origin()
def get_services():
    services = dbObject.get_services()
    res = []
    for service in services:
        res.append({"name":service[1], "id":service[0]})
    return(res)
