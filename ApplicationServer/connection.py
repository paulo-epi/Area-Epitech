import mysql.connector
import env
from google.oauth2.credentials import Credentials
from typing import List
from github import Github
import json
import datetime


def make_area_object(action_data, reaction_data):
    res = {}
    res["user_id"] = action_data[1]
    res["action"] = {
        "action_id":action_data[2],
        "data_json":action_data[3],
        "oauth_provider":action_data[4]
        }
    res["reaction"] = {
        "reaction_id":reaction_data[1],
        "data_json":reaction_data[2],
        "oauth_provider":reaction_data[3]
    }
    return res

class Database:
    def __init__(self):
        self.database = mysql.connector.connect(
            host=env.var("host"),
            user=env.var("username"),
            password=env.var("password"),
            database=env.var("database")
        )
        self.cursor = self.database.cursor()

    def request(self, sql: str):
        self.cursor.execute(sql)
        self.database.commit()
        return self.cursor.fetchall()

    def get_data(self, sql: str):
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def select(self, table: str, fields: List[str] = ["*"], condition: str = "", join: List[str] = [""]):
        sql = "SELECT"
        for field in range(0, len(fields)):
            if field != 0:
                sql += ", " + fields[field]
            else:
                sql += " " + fields[field]
        sql += " FROM " + table
        if join != [""]:
            for j in join:
                sql += " " + j
        if condition != "":
            sql += " WHERE " + condition
        return self.get_data(sql)

    def insert(self, table: str, fields: List[str], values: List[str]):
        sql = "INSERT INTO " + table + " ("
        for field in fields:
            sql += field
            if field != fields[len(fields) - 1]:
                sql += ", "
        sql += ") VALUES ("
        for i in range(0, len(values)):
            if i != 0:
                sql += ", "
            sql += values[i]
        sql += ")"
        self.request(sql)

    def update(self, table: str, fields: List[str], values: List[str], condition: str):
        sql = "UPDATE " + table + " SET "
        for i in range(0, len(fields)):
            sql += fields[i] + " = " + values[i]
            if i != len(fields):
                sql += ", "
        sql += " WHERE " + condition

    def get_hashed_password_from(self, email):
        return self.select("user", ["password_hash"], "email=\"" + email + "\"")[0][0]

    def get_emails(self):
        return self.select("user", ["email"])

    def insert_user(self, email, password_hash):
        return self.insert("user", ["email", "password_hash"], ['"' + email + '"', '"' + password_hash + '"'])

    def insert_area(self, user_id, action_id, action_data, reaction_id, reaction_data):
        if isinstance(user_id, list):
            user_id = user_id[0][0]
        sql = "INSERT INTO area (user_id, action_id, action_json, reaction_id, reaction_json) VALUES ("
        sql += str(user_id) + ", " + str(action_id) + ", " + str(action_data)
        sql += ", " + str(reaction_id) + ", " + str(reaction_data) + ");"
        print("sql:")
        print(sql)
        self.cursor.execute(sql)
        self.database.commit()

    def remove_area(self, id, user_id):
        if isinstance(user_id, list):
            user_id = user_id[0][0]
        sql = "DELETE FROM area WHERE id=" + \
            str(id) + " AND user_id=" + str(user_id)
        self.cursor.execute(sql)
        self.database.commit()

    def get_user_id(self, email):
        return self.select("user", ["id"], "email=\"" + email + "\"")

    def get_google_creds(self, user_id):
        data = self.select("oauth_token", condition=(
            "user_id=" + str(user_id) + " AND service_id=0"))
        print (user_id)
        print(data)
        if data == []:
            return -1
        if data[0][7] < datetime.datetime.now():
            return -1
        creds = Credentials(
            token=data[0][3],
            refresh_token=data[0][4],
            client_id=data[0][5],
            client_secret=data[0][6],
            expiry=data[0][7]
        )
        return creds

    def get_services(self):
        return self.select("service")

    def get_email_from_user_id(self, user_id):
        return self.select("user", ["email"], "id=" + str(user_id))[0][0]

    def get_about_json(self):
        return self.select("service",
                           join=["LEFT JOIN action ON action.service_id = service.id",
                                 "LEFT JOIN reaction ON reaction.service_id = service.id"]
                           )

    def get_areas(self):
        res = []
        action_data = self.select("area", [
            "area.id",
            "area.user_id",
            "area.action_id",
            "area.action_json",
            "service.oauth_provider_id",
            ], join=[
            "LEFT JOIN action ON action.id = area.action_id",
            "JOIN service ON action.service_id = service.id",
            "LEFT JOIN oauth_provider ON service.oauth_provider_id = oauth_provider.id"]
            )
        reaction_data = self.select("area", [
            "area.id",
            "area.reaction_id",
            "area.reaction_json",
            "service.oauth_provider_id"
        ], join=[
            "LEFT JOIN reaction ON reaction.id = area.reaction_id",
            "JOIN service ON reaction.service_id = service.id",
            "LEFT JOIN oauth_provider ON service.oauth_provider_id = oauth_provider.id"
        ])
        for i in action_data:
            for j in reaction_data:
                if i[0] == j[0]:
                    res.append(make_area_object(i, j))
                    break
        return res

    def get_user_area(self, user_id):
        data = self.select("area",[
            "area.id",
            "action.name",
            "action_json",
            "reaction.name",
            "reaction_json",
        ], "user_id = " + str(user_id), join=[
            "LEFT JOIN action ON action.id = action_id",
            "LEFT JOIN reaction ON reaction.id = reaction_id"
        ])
        for i in data:
            print(i)
        return data

    def get_microsoft_creds(self, user_id):
        data = self.select("oauth_token", condition=(
            "user_id=" + str(user_id) + " AND service_id=1"))
        if data == []:
            return -1
        creds = {
            "access_token": data[0][3],
            "expires_in": data[0][7]
        }
        return creds
    
    def get_github_creds(self, user_id):
        data = self.select("oauth_token", condition=(
            "user_id=" + str(user_id) + " AND service_id=2"))
        print("data github creds:")
        print(data)
        if data == []:
            return -1
        creds = Github(data[0][3])
        return creds
    
    def get_discord_creds(self, user_id):
        creds = None
        data = self.select("oauth_token", condition=(
            "user_id=" + str(user_id) + " AND service_id=3"))
        if data == []:
            return -1
        return -1
    
    def get_meta_creds(self, user_id):
        creds = None
        data = self.select("oauth_token", condition=(
            "user_id=" + str(user_id) + " AND service_id=4"))
        if data == []:
            return -1
        return -1

dbObject = Database()
