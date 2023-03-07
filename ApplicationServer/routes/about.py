from flask import request
from __main__ import app, dbObject
from flask_cors import cross_origin
import time

def services_dict_to_list(services):
    res = []
    for name in services:
        res.append({
            "name": services[name],
            "actions": services[name]["actions"],
            "reactions": services[name]["reactions"]
        })
    return res

def make_service_dict_from_entries(entries):
    services = {}
    for entrie in entries:
        if entrie[1] not in services.keys():
            services[entrie[1]] = {}
            services[entrie[1]]["name"] = entrie[1]
            services[entrie[1]]["actions"] = []
            services[entrie[1]]["reactions"] = []
        if entrie[4] != None:
            services[entrie[1]]["actions"].append({
                "description":entrie[5],
                "name":entrie[4],
            })
        if entrie[8] != None:
            services[entrie[1]]["reactions"].append({
                "description":entrie[9],
                "name":entrie[8],
            })
    return services

@app.route("/about.json")
@cross_origin()
def about_json():
    host = request.remote_addr.__str__()
    current_time = int(time.time())
    entries = dbObject.get_about_json()

    # get services, actions & reactions and parse entries into 'services'
    services = make_service_dict_from_entries(entries)
    services = services_dict_to_list(services)

    # build result
    client = {"host":host}
    server = {"current_time":current_time, "services": services}
    result = {"client":client, "server":server}
    return result