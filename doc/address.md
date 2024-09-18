# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization: token

Rquest Body :

```json
{
  "street": "Jalan Contoh", //optional
  "city": "Kota", //optional
  "province": "Provinsi", //optional
  "country": "Negara",
  "postal_code": "2134"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Contoh", //optional
    "city": "Kota", //optional
    "province": "Provinsi", //optional
    "country": "Negara",
    "postal_code": "2134"
  }
}
```

## Get Address

Endpoint : DET /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization: token

Response Body :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Contoh", //optional
    "city": "Kota", //optional
    "province": "Provinsi", //optional
    "country": "Negara",
    "postal_code": "2134"
  }
}
```

## Update Address

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization: token

Rquest Body :

```json
{
  "street": "Jalan Contoh", //optional
  "city": "Kota", //optional
  "province": "Provinsi", //optional
  "country": "Negara",
  "postal_code": "2134"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Contoh", //optional
    "city": "Kota", //optional
    "province": "Provinsi", //optional
    "country": "Negara",
    "postal_code": "2134"
  }
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization: token

Response Body :

```json
{
  "message": "Success deleted data"
}
```

## List Addresses

Endpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization: token

Response Body :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan Contoh", //optional
      "city": "Kota", //optional
      "province": "Provinsi", //optional
      "country": "Negara",
      "postal_code": "2134"
    },
    {
      "id": 2,
      "street": "Jalan Contoh", //optional
      "city": "Kota", //optional
      "province": "Provinsi", //optional
      "country": "Negara",
      "postal_code": "2134"
    }
  ]
}
```
