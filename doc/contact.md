# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Headers :

- Authorization: token

Request Body :

```json
{
  "first_name": "Youse Nur",
  "last_name": "Fauzi",
  "email": "yousenurf@gmail.com",
  "phonse": "0828871238"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "first_name": "Youse Nur",
    "last_name": "Fauzi",
    "email": "yousenurf@gmail.com",
    "phone": "0828871238"
  }
}
```

## Get Contact

Endpoint : POST /api/contacts/:contactId

Headers :

- Authorization: token

Response Body :

```json
{
  "data": {
    "id": 1,
    "first_name": "Youse Nur",
    "last_name": "Fauzi",
    "email": "yousenurf@gmail.com",
    "phone": "0828871238"
  }
}
```

## Update Contact

Endpoint : PUT /api/contacts/:contactId

Headers :

- Authorization: token

Request Body :

```json
{
  "first_name": "Youse Nur",
  "last_name": "Fauzi",
  "email": "yousenurf@gmail.com",
  "phonse": "0828871238"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "first_name": "Youse Nur",
    "last_name": "Fauzi",
    "email": "yousenurf@gmail.com",
    "phone": "0828871238"
  }
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:contactId

Headers :

- Authorization: token

Request Body :

```json
{
  "first_name": "Youse Nur",
  "last_name": "Fauzi",
  "email": "yousenurf@gmail.com",
  "phonse": "0828871238"
}
```

Response Body :

```json
{
  "message": "Success deleted data"
}
```

## Search Contact

Endpoint : GET /api/contacts

Headers :

- Authorization: token

Query Params :

- name: string (optional)
- phone: string (optional)
- email: string (optional)
- page: number, default 1
- size: number, default 10

Response Body :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Youse Nur",
      "last_name": "Fauzi",
      "email": "yousenurf@gmail.com",
      "phone": "0828871238"
    },
    {
      "id": 2,
      "first_name": "Youse",
      "last_name": "Fauzi",
      "email": "yousef@gmail.com",
      "phone": "0828871238"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
