from connection import dbObject
import time
import json
from meteo_area import *
from google_area import *
from github_area import *
from microsoft_area import *
from discord_area import *

#Oauth type :
METEO = -1
GOOGLE = 0
MICROSOFT = 1
GITHUB = 2
DISCORD = 3
META = 4
delta = 120

def get_creds(area, user_id, key_word):
    creds = None
    print(f"oauth", area[key_word]["oauth_provider"])
    if area[key_word]["oauth_provider"] == METEO:#ok
        creds = None
    if area[key_word]["oauth_provider"] == GOOGLE:#ok
        print("google")
        creds = dbObject.get_google_creds(user_id)
    if area[key_word]["oauth_provider"] == MICROSOFT:
        creds = dbObject.get_microsoft_creds(user_id)
    if area[key_word]["oauth_provider"] == GITHUB:#ok
        creds = dbObject.get_github_creds(user_id)
    if area[key_word]["oauth_provider"] == META:
        creds = dbObject.get_meta_creds(user_id)
    if area[key_word]["oauth_provider"] == DISCORD:
        creds = dbObject.get_discord_creds(user_id)
    return creds

def make_action(user_id, creds_action, data_action, action_id):
    if action_id == 0 and delta >= 120:
        delta = 0
        return (cold_weater())#ok
    if action_id == 1:
        print("new mail x")
        return (gmail_x(creds_action, user_id, data_action))#ok
    if action_id == 2:
        return (outlook_x(creds_action, user_id, data_action))
    if action_id == 3:
        return (google_calendar(creds_action))#ok
    if action_id == 4:
        return (microsoft_calendar(creds_action, user_id, data_action))
    if action_id == 5:
        return (mess_discord_from_x(creds_action, user_id, data_action))
    if action_id == 6:
        return (mess_discord_x_like(creds_action, user_id, data_action))
    if action_id == 7:
        return (github_new_issue(creds_action, user_id, data_action))#ok
    if action_id == 8:
        return (github_new_star(creds_action, user_id, data_action))#ok
    if action_id == 9 and delta >= 120:
        delta = 0
        return (temperature_under_0())#ok
    if action_id == 10:
        return (outlook_new(creds_action, user_id, data_action))
    if action_id == 11:
        print("new mail")
        return (gmail_new(creds_action, user_id, data_action))#ok
    if action_id == 12:
        return (github_new_fork(creds_action, user_id, data_action))#ok
    if action_id == 13:
        return (github_new_push(creds_action, user_id, data_action))#ok
    return (0)

def make_reaction(user_id, creds_reaction, data_reaction, reaction_id):
    if reaction_id == 0:
        send_email_to_x(creds_reaction, user_id, data_reaction) #ok
        return
    if reaction_id == 1:
        send_email_outlook(creds_reaction, user_id, data_reaction)
        return
    if reaction_id == 2:
        create_document(creds_reaction, user_id, data_reaction) #ok
        return
    if reaction_id == 3:
        github_create_fork(creds_reaction, user_id, data_reaction) #ok
        return
    if reaction_id == 4:
        github_create_issue(creds_reaction, user_id, data_reaction) #ok
        return
    if reaction_id == 5:
        send_email_to_self(creds_reaction, user_id, data_reaction) #ok
        return
    return

def area_thread():
    delta = 120
    while(1):
        areas = dbObject.get_areas()
        time.sleep(30)
        delta += 1
        if len(areas) == 0:
            continue
        for area in areas:
            user_id = area["user_id"]
            creds_action = get_creds(area, user_id, "action")
            data_action = area["action"]["data_json"]
            creds_reaction = get_creds(area, user_id, "reaction")
            data_reaction = area["reaction"]["data_json"]
            print("testing credentials...", creds_action, creds_reaction)
            if creds_action != -1 and creds_reaction != -1:
                print("test action")
                if make_action(user_id, creds_action, data_action, area["action"]["action_id"]) == 1:
                    print("Success action !")
                    make_reaction(user_id, creds_reaction, data_reaction, area["reaction"]["reaction_id"])
        
            
        