from github import Github
import datetime
import json

# github actions

def github_new_star(creds: Github, user_id, json_text):
    repo = creds.get_repo(json.loads(json_text)["repo_name"])
    events = repo.get_events()
    for event in events:
        if (datetime.datetime.utcnow() - event.created_at < datetime.timedelta(minutes=1)
                and event.type == "WatchEvent"):
            return 1
    return 0

def github_new_issue(creds: Github, user_id, json_text):
    repo = creds.get_repo(json.loads(json_text)["repo_name"])
    events = repo.get_events()
    for event in events:
        if (datetime.datetime.utcnow() - event.created_at < datetime.timedelta(minutes=1)
                and event.type == "IssuesEvent"):
            if (event.payload["action"] == "opened"):
                return 1
    return 0

def github_new_fork(creds: Github, user_id, json_text):
    repo = creds.get_repo(json.loads(json_text)["repo_name"])
    events = repo.get_events()
    for event in events:
        if (datetime.datetime.utcnow() - event.created_at < datetime.timedelta(minutes=1)
                and event.type == "ForkEvent"):
            return 1
    return 0

def github_new_push(creds: Github, user_id, json_text):
    repo = creds.get_repo(json.loads(json_text)["repo_name"])
    events = repo.get_events()
    for event in events:
        if (datetime.datetime.utcnow() - event.created_at < datetime.timedelta(minutes=1)
                and event.type == "PushEvent"):
            return 1
    return 0


# github reactions

def github_create_issue(creds: Github, user_id, json_text):
    repo = creds.get_repo(json.loads(json_text)["repo_name"])
    issue = json.loads(json_text)["issue"]
    repo.create_issue(issue["title"], issue["body"])

def github_create_fork(creds: Github, user_id, json_text):
    repo = creds.get_repo(json.loads(json_text)["repo_name"])
    repo.create_fork()
