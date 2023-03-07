#!/usr/bin/env python3

import flags
from flask import Flask, send_file
from threading import Thread
import connection
from flask_cors import CORS, cross_origin
from area_thread import *
import signal

# Application variables

dbObject = connection.dbObject
app = Flask("Area Application Server")
cors = CORS(app)
host = "0.0.0.0"
port = "8080"
app.config['CORS_HEADERS'] = 'Content-Type'

# Routes

import routes.services
import routes.actions
import routes.githubCode
import routes.reactions
import routes.areas
import routes.about
import routes.user.login
import routes.user.register
import routes.user.oauth

# Threads
import logging
import threading


@app.route("/")
def home():
    return "Hello World!"

def handler(signum, frame):
    print("Bye bye")
    exit(0)

@app.route('/download')
def downloadFile ():
    #For windows you need to use drive name [ex: F:/Example.pdf]
    path = "./client/client.apk"
    return send_file(path, as_attachment=True)

def main():
    flags.help()
    port = flags.get_port()
    action = threading.Thread(target=area_thread, args=())
    action.start()
    app.run(host, port)
    signal.signal(signal.SIGINT, handler)
    action.join()


if __name__ == "__main__":
    main()