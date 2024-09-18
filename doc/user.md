# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "yousenurf",
  "password": "rahasia",
  "name": "Youse Nur F"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "yousenurf",
    "name": "Youse Nur F"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "yousenurf",
  "password": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "yousenurf",
    "name": "Youse Nur F",
    "token": "session_id_generated"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or password is wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Headers :

- Authorization: token

Response Body (Success) :

```json
{
  "data": {
    "username": "yousenurf",
    "name": "Youse Nur F"
  }
}
```

Response Body (Failed) :

````json
{
  "errors" : "Unauthorized"
}

## Update User

Endpoint : PATCH /api/users/current

Headers :
- Authorization: token

Request Body :

```json
{
  "password" : "rahasia", // optional, if wont to change
  "name" : "Youse Nur F" // optional, if wont to change
}
````

Response Body (Success) :

```json
{
  "data": {
    "username": "yousenurf",
    "name": "Youse Nur F"
  }
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers :

- Authorization: token

Response Body (Success) :

```json
{
  "data": {
    "username": "yousenurf",
    "name": "Youse Nur F"
  }
}
```
