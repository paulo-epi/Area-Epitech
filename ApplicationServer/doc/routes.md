# Routes documentation

## [GET] <http://localhost:8080/about.json>

Return a json file containing every services that this area app can deliver

## [POST] <http://localhost:8080/register>

form: {"email", "password"}

Complete the form and it will store a new account in the connected database

## [POST] <http://localhost:8080/login>

form: {"email", "password"}

Complete the form and it will give you a JWT (Json Web Token) to access the other routes

## [GET] <http://localhost:8080/areas>

header: {"jwt"}

Put your jwt in the header to validate your identity and confirm you are logged in

This route will then send you back every Action & Reaction couples associated to you

## [GET] <http://localhost:8080/get_actions>

This will serve you a list of actions available for you

## [GET] <http://localhost:8080/get_reactions>

This will serve you a list of reactions available for you

## [POST] <http://localhost:8080/add_area>

header: {"jwt"}

form: {"action_id", "action_data", "reaction_id", "reaction_data"}

**Action_id** and **reaction_id** can be retrieved with the get_action and get_reaction route.

**Action_data** and **reaction_data** are json formated string containing additional data for more sophisticated Areas

See the [documentation](areas.md) to know what to put in *action_data* and *reaction_data*

This will tell the back-end service to do a *reaction* when an *action* happens

## [DELETE] <http://localhost:8080/remove_area>

header: {"jwt"}

form: {"area_id"}

This route will remove one of your action/reaction couple

## *deprecated* [POST] <http://localhost:8080/oauth_google>

header: {"jwt"}

This route will store your oauth google token in the database for the back end services

## [POST] <http://localhost:8080/add_oauth>

header: {"jwt"}

form: {"service_id", "token", "refresh_token", "client_id", "client_secret", "expiry"}

service_id is an id referring to a service
(0 = google)

token, refresh_token, client_id, client_secret and expiry are all going to be values given by your oauth provider

## [GET] <http://localhost:8080/get_services>

This route will send respond with a json containing a list of service with their associated id
