# Area Application Server

## Setup

Follow theses steps to setup the server

### Database

Create a database on your computer and dump the `database.sql` file on your sql service

For exemple, with mariaDB after starting the daemon use this line:

`sudo mariadb database_name < database.sql`

#### Database daemon

If your sql service isn't running you should consider starting it

On fedora

`sudo systemctl start mariadb`

### Env

Create file named `.env` at the root of the Application Server directory

Next add the following lines inside:

```env
host=localhost
username=sql_username
password=sql_password
database=the name of the previously created database
```

## Basics

Run the server with `./index.py`

This server was built to **run on 8080 port**

You can change this setting by executing it with the `-p [port]` flag

## Routes

> The route documentation is being moved over [here](doc/routes.md)

### [GET] <http://localhost:8080/about.json>

Return a json file containing every services that this area app can deliver

### [POST] <http://localhost:8080/register>

form: {"email", "password"}

Complete the form and it will store a new account in the connected database

### [POST] <http://localhost:8080/login>

form: {"email", "password"}

Complete the form and it will give you a JWT (Json Web Token) to access the other routes

### [GET] <http://localhost:8080/areas>

header: {"jwt"}

Put your jwt in the header to validate your identity and confirm you are logged in

This route will then send you back every Action & Reaction couples associated to you

### [GET] <http://localhost:8080/get_actions>

This will serve you a list of actions available for you

### [GET] <http://localhost:8080/get_reactions>

This will serve you a list of reactions available for you

### [POST] <http://localhost:8080/add_area>

header: {"jwt"}

form: {"action_id", "action_data", "reaction_id", "reaction_data"}

**Action_id** and **reaction_id** can be retrieved with the get_action and get_reaction route.

**Action_data** and **reaction_data** are json formated string containing additional data for more sophisticated Areas

This will tell the back-end service to do a _reaction_ when an _action_ happens

### [DELETE] <http://localhost:8080/remove_area>

header: {"jwt"}

form: {"area_id"}

This route will remove one of your action/reaction couple

### _deprecated_ [POST] <http://localhost:8080/oauth_google>

header: {"jwt"}

This route will store your oauth google token in the database for the back end services

### [POST] <http://localhost:8080/add_oauth>

header: {"jwt"}

form: {"service_id", "token", "refresh_token", "client_id", "client_secret", "expiry"}

service_id is an id referring to a service
(0 = google)

token, refresh_token, client_id, client_secret and expiry are all going to be values given by your oauth provider

### [GET] <http://localhost:8080/get_services>

This route will send respond with a json containing a list of service with their associated id
