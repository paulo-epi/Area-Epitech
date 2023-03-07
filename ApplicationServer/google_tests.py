from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import base64
from email.message import EmailMessage

scopes = [
    "https://www.googleapis.com/auth/pubsub",
    "https://mail.google.com/",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/calendar.readonly"
]

def Oauth_google(scopes):
    creds = None
    flow = InstalledAppFlow.from_client_secrets_file('credentials.json', scopes)
    creds = flow.run_local_server(port=0)
    return creds

if __name__ == "__main__":
    c = Oauth_google(scopes)
    print("token:")
    print(c.token)
    print("refresh token:")
    print(c.refresh_token)
    print("client id:")
    print(c.client_id)
    print("secret:")
    print(c.client_secret)
    print("expiry:")
    print(c.expiry)
