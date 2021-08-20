# API untuk web-sales
untuk server rest api saya memakai `express` dan `mongodb`

## Setup

pastikan file `.env` sudah ada dan diisi dengan data yang diperlukan.

`npm run seed` untuk mengisi database dengan random data dummy (bisa berulang kali dan juga saat server berjalan).

`npm run start` untuk menjalankan server api di `localhost:3000`.

## APIs

### users

GET `/users`
response
```json
[
  {
    "_id": "611e27fd31e1ec39bc1e4b5a",
    "email": "maya.dicki@yahoo.com",
    "password": "$2b$10$eeIn5QPWTPaCwI4IvqeYA.fohC4dlW8dwuINP/lSdeyB8/1qdVDK6",
    "status": "user",
    "createdAt": "2021-08-19T09:44:29.926Z",
    "updatedAt": "2021-08-19T09:44:29.926Z",
    "__v": 0
  },
  ...
]
```

GET `/users/count`
response
```json
{
  "status": "success",
  "count": 101
}
```

POST `/users/login`
data
| key | required |
| --- | --- |
| email | yes |
| password | yes |

response
```json
{
  "status": "success",
  "token": "<jwt token here>"
}
```

POST `/users/logout`
response
```json
{
  "status": "success"
}
```

### transactions

GET `/transactions`
response
```json
[
  {
    "_id": "611c82a9436370022c49cd8d",
    "service": "Tasty Wooden Ball",
    "total": 331,
    "transactionDate": "2021-08-30T21:59:02.066Z",
    "userId": "611c82a9436370022c49cd8c",
    "createdAt": "2021-08-18T03:46:49.918Z",
    "updatedAt": "2021-08-18T03:46:49.918Z",
    "__v": 0
  },
  ...
]
```

GET `/transactions/count`
response
```json
{
  "status": "success",
  "count": 151
}
```

GET `/transactions/income`
query
| key | required |
| --- | --- |
| month | no |

response
```json
{
  "status": "success",
  "total": [
    {
      "week": 1,
      "total": 16076
    },
    {
      "week": 2,
      "total": 19360
    },
    {
      "week": 3,
      "total": 15021
    },
    {
      "week": 4,
      "total": 19818
    },
    {
      "week": 5,
      "total": 7847
    }
  ]
}
```