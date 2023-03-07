from jwt import decode
from flask import request

def authentification(header):
    if not "jwt" in header:
        return False
    jwt = header["jwt"]
    decoded_jwt = None
    try:
        decoded_jwt = decode(jwt, "la_clef_des_tokens", algorithms=["HS256"])
    except:
        return False
    return True

def auth_fail():
    return("request failed, user is not logged in/identified")

def get_user_id():
    user_id = decode(request.headers["jwt"], key="la_clef_des_tokens", algorithms=["HS256"])["id"]
    if isinstance(user_id, list):
        user_id = user_id[0][0]
    return user_id