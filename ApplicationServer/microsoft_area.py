import json
import os
import base64
import requests
import webbrowser
from datetime import datetime
import json
import os
from msal import *
import webbrowser
import json


GRAPH_API_ENDPOINT = 'https://graph.microsoft.com/v1.0'

def generate_access_token(app_id, client_secret, scopes):
    client = ConfidentialClientApplication(app_id, client_secret)
    url = client.get_authorization_request_url(scopes)
    print(url)
    webbrowser.open(url)

def microsoft_calendar(creds, user_id, json_txt):
    return

def outlook_x(creds, user_id, json_txt):
    return

def outlook_new(creds, user_id, json_txt):
    return

def send_email_outlook(creds, user_id, json_txt):
    adress = json.loads(json_txt)["adress"]
    msg = json.loads(json_txt)["message"]
    subject = json.loads(json_txt)["subject"]

    headers = {
        'Authorization': 'Bearer ' + creds['access_token']
    }
    mail_obj = {
        'message': {
            'subject': subject,
            'importance': 'normal',
            'body': {
            'contentType': 'Text',
            'content': msg
            },
            'toRecipients': [
            {
                'emailAddress': {
                'address': adress
                }
            }
            ]
        },
    }
    endpoint = 'https://graph.microsoft.com/v1.0/me/sendMail'
    requests.post(endpoint, headers=headers, json=mail_obj)
    return