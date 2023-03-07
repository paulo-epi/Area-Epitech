import datetime
import time
import json
from parsing import *
from connection import dbObject
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import base64
from email.message import EmailMessage

def google_calendar(creds):
    service = build('calendar', 'v3', credentials=creds)
    now = datetime.datetime.utcnow().isoformat() + 'Z'
    print('Getting the upcoming 10 events')
    events_result = service.events().list(calendarId='primary', timeMin=now, maxResults=10, singleEvents=True, orderBy='startTime').execute()
    events = events_result.get('items', [])

    if not events:
        print('No upcoming events found.')
        return 0

    for event in events:
        now = datetime.datetime.utcnow().isoformat() + 'Z'
        now = parse_time(now, 16)
        start = event['start'].get('dateTime', event['start'].get('date'))
        start = parse_time(start, 16)
        if (start == now):
            print ("match !")
            return 1
    return 0


def create_document(creds, user_id, json_text):
    title = json.loads(json_text)["title"]
    content = json.loads(json_text)["content"]
    service = build('docs', 'v1', credentials=creds)
    body = {
        'title': title,
    }
    doc = service.documents().create(body=body).execute()
    document_id = doc.get('documentId')
    print('Created document: {} et id {}'.format(doc.get('title'), document_id))
    requests = [
        {
            'insertText': {
                'location': {
                    'index': 1,
                },
                'text': content
            }
        }
    ]
    service.documents().batchUpdate(documentId=document_id, body={'requests': requests}).execute()

def send_email_to_x(creds, user_id, json_text):
    adress = json.loads(json_text)["adress"]
    msg = json.loads(json_text)["message"]
    subject = json.loads(json_text)["subject"]
    service = build('gmail', 'v1', credentials=creds)
    message = EmailMessage()
    message.set_content(msg)
    message['To'] = adress
    message['Subject'] = subject

    encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

    create_message = {
        'raw': encoded_message
    }
    send_message = (service.users().messages().send(userId="me", body=create_message).execute())

    print(F'Message Id: {send_message["id"]}')

def send_email_to_self(creds, user_id, json_text):
    adress = dbObject.get_email_from_user_id(user_id)
    msg = json.loads(json_text)["message"]
    subject = json.loads(json_text)["subject"]
    service = build('gmail', 'v1', credentials=creds)
    message = EmailMessage()
    message.set_content(msg)
    message['To'] = adress
    message['Subject'] = subject

    encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

    create_message = {
        'raw': encoded_message
    }
    send_message = (service.users().messages().send(userId="me", body=create_message).execute())

    print(F'Message Id: {send_message["id"]}')


def gmail_x(creds, user_id, json_text):
    x_name = json.loads(json_text)["adress"]
    service = build('gmail', 'v1', credentials=creds)

    results = service.users().messages().list(userId='me', labelIds=['INBOX'], q="is:unread").execute() #q="is:unread"
    messages = results.get('messages',[])
    for message in messages:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        email_date = msg['internalDate']
        email_data = msg['payload']['headers']
        from_name = ""
        date = ""
        now = datetime.datetime.utcnow().isoformat() + 'Z'
        now = parse_time(now, 16)
        for values in email_data:
            delta = datetime.datetime.now() - datetime.datetime.fromtimestamp(int(email_date) / 1000)
            name = values['name']
            if name == 'From':
                from_name = values['value'] #get name X ex : Doctolib <no-reply@doctolib.fr>
                from_name = get_email_adress(from_name)
            if from_name == x_name and delta < datetime.timedelta(minutes=1):
                return 1
    return 0

def gmail_new(creds, user_id, json_text):
    service = build('gmail', 'v1', credentials=creds)
    results = service.users().messages().list(userId='me', labelIds=['INBOX'], q="is:unread").execute() #q="is:unread"
    messages = results.get('messages',[])
    for message in messages:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        email_date = msg['internalDate']
        delta = datetime.datetime.now() - datetime.datetime.fromtimestamp(int(email_date) / 1000)
        if delta < datetime.timedelta(minutes=1):
            print("Detect !")
            return 1
    return 0