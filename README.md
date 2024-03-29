# Online Car Marketplace REST API

### Introduction

Online Car Marketplace REST API is an open source platform that enables car owners to connect to potential customers who may be interested in purchasing cars found in listings.

### Technologies Used
Online Car Marketplace REST API is based on [TypeScript](https://www.typescriptlang.org/), [NodeJS](https://nodejs.org/), [ExpressJS](https://www.expresjs.org/), [MongoDB](https://www.mongodb.com/) and [Mongoose ODM](https://mongoosejs.com/). 

### Installation Guide

1. Clone this repository [here](https://github.com/marcopagotto/online-car-marketplace-REST-API.git)
2. Install the project's dependencies:

```
npm install
```

3. Register/log into your MongoDB account [here](https://account.mongodb.com/account/login) and create a project
4. Create an .env file in your project root folder and add your variables accordingly to .env.sample

### Usage

Run the application by starting the server:

```
npm run dev
```

If you are going to modify the source code, you shall also activate the TypeScript compiler:

```
npm run tsc
```

Connect to the API using Postman on the port specified at .env.

### API Endpoints

| HTTP Verbs | Endpoints                 | Action                                                                                                                                                         | Restrictions                                                          |
| ---------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| POST       | /api/auth/register        | To create a new user                                                                                                                                           | No restrictions                                                       |
| POST       | /api/auth/login           | To authenticate the user                                                                                                                                       | No restrictions                                                       |
| POST       | /api/cars/add/:id         | To add a car to the user associated with the provided id                                                                                                       | <ul><li>User must be authenticated<ul>                                |
| POST       | /api/listings/create      | To post a listing                                                                                                                                              | <ul><li>User must be authenticated <li>User must be car owner<ul>     |
| GET        | /api/users?results        | To retrive the registered users - the amount of users returned can be specified as a number in "results" query                                                 | <ul><li>User must be authenticated<ul>                                |
| GET        | /api/cars/owner/:id       | To retrive the user owning the car with the specifeid id                                                                                                       | <ul><li>User must be authenticated<ul>                                |
| GET        | /api/listings?results     | To retrive listings - the amount of listings returned can be specified as a number in "results" query                                                          | No restrictions                                                       |
| GET        | /api/listings/:id         | To retrive the listing with the specified id                                                                                                                   | <ul><li>User must be authenticated</ul>                               |
| PATCH      | /api/auth/change-password | To update the password of the authenticated user                                                                                                               | <ul><li>User must be authenticated</ul>                               |
| PATCH      | /api/cars/update/:id      | To update the fields of the car with the specified id                                                                                                          | <ul><li>User must be authenitcated<li>User must be car owner</ul>     |
| PATCH      | /api/listings/update/:id  | To update the listing with the specified id                                                                                                                    | <ul><li>User must be authenticated<li>User must be listing owner</ul> |
| DELETE     | /api/users/delete/:id     | To delete the user with the specified id </br></br> <em>Performing such action will also delete all users' listings and will clear authentication cookies</em> | <ul><li>User must be authenticated </ul>                              |
| DELETE     | /api/cars/delete/:id      | To delete the car with the specified id </br></br> <em>Performing such action will also delete, if exists, the listing associated with the car</em>            | <ul><li>User must be authenticated <li> User must be car owner</ul>   |
| DELETE     | /api/listings/delete/:id  | To delete the listing with the specified id                                                                                                                    | <ul><li>User must be authenticated<li>User must be listing owner</ul> |

### Examples of Requests and Responeses

Examples of requests and corresponding responses that demonstrate the usage of the API endpoints are being provided underneath (in the examples provided server is hosted at port 8080):

<li><b>User registration:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/auth/register</code></br>
<em>Request method</em>: <b>
<span style="color: #FFD700;">POST</span>
</b></br>
<em>Request body:</em>

```json
{
  "username": "marco",
  "email": "marco@gmail.com",
  "password": "password"
}
```

<em>Response body:</em>

```json
{
  "username": "marco",
  "email": "marco@gmail.com",
  "authentication": {
    "password": "53bce09ea81e28cb30b6d6f8fb5fbc0deac35c27bcb19a5a59194036f56fc8cc",
    "salt": "fUhg7kAfqkDp8fzrx5CvTq/o0UiN5XcMrO5Qk8K9O5PPqHFEOWhLQnqwtc4Du/AV745br0bf/iha8UYWQ98CnqtK/HWA/pudGsnBVb7kWYZzkOCrL7Pidc/Q55e+dTvSRSSKDCeH0DrZ/pUKv3bH1ewTR5IAfRrumRCy8TwP9Zo="
  },
  "_id": "66056f78595b4f13e5b43111",
  "cars": [],
  "__v": 0
}
```

Notes: </br>email provided in <em>Request Body</em> must be unique
</br>

<li><b>User authentication:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/auth/login</code></br>
<em>Request method</em>: <b>
<span style="color: #FFD700;">POST</span>
</b></br>
<em>Request body:</em>

```json
{
  "username": "marco",
  "email": "marco@gmail.com",
  "password": "password"
}
```

<em>Response body:</em>

```json
{
  "authentication": {
    "password": "53bce09ea81e28cb30b6d6f8fb5fbc0deac35c27bcb19a5a59194036f56fc8cc",
    "salt": "fUhg7kAfqkDp8fzrx5CvTq/o0UiN5XcMrO5Qk8K9O5PPqHFEOWhLQnqwtc4Du/AV745br0bf/iha8UYWQ98CnqtK/HWA/pudGsnBVb7kWYZzkOCrL7Pidc/Q55e+dTvSRSSKDCeH0DrZ/pUKv3bH1ewTR5IAfRrumRCy8TwP9Zo=",
    "sessionToken": "736ef707293451d0c8ef79f65f94c15b450cebb24ffa7c99173c86810d363a04"
  },
  "_id": "66056f78595b4f13e5b43111",
  "username": "marco",
  "email": "marco@gmail.com",
  "cars": [],
  "__v": 0
}
```

Notes:
<code>AUTH-LOGIN</code> cookie attached:
| Name | Value | Domain | Path | Expires | HttpOnly | Secure |
|-|-|-|-|-|-|-|
AUTH-LOGIN | 736ef707293451d0c8ef79<br>f65f94c15b450cebb24ffa7<br>c99173c86810d363a04|localhost|/|Session|false|false|

</br>

<li><b>Add car:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/cars/add/66056f78595b4f13e5b43111</code></br>
<em>Request method</em>: <b>
<span style="color: #FFD700;">POST</span>
</b></br>

<em>Request body</em>:

```json
{
  "make": "Lamborghini",
  "model": "Aventador",
  "year": 2022
}
```

<em>Response body:</em>

```json
{
  "make": "Lamborghini",
  "model": "Aventador",
  "year": 2022,
  "_id": "66058dca9776944f3ea1f819"
}
```

</br>

<li><b>Create listing:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/listings/create</code></br>
<em>Request method</em>: <b>
<span style="color: #FFD700;">POST</span>
</b></br>

<em>Request body</em>:

```json
{
  "carId": "66058dca9776944f3ea1f819",
  "owner": "66056f78595b4f13e5b43111",
  "price": 180000
}
```

<em>Response body:</em>

```json
{
  "car": {
    "make": "Lamborghini",
    "model": "Aventador",
    "year": 2022,
    "_id": "66058dca9776944f3ea1f819"
  },
  "owner": "66056f78595b4f13e5b43111",
  "price": 180000,
  "_id": "66058fe99776944f3ea1f824",
  "__v": 0
}
```

Notes: </br>each car can <em>only</em> be associated to one listing

</br>

<li><b>Get users:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/users</code></br>
<em>Request method</em>: <b>
<span style="color: green;">GET</span>
</b></br>

<em>Response body:</em>

```json
[
  {
    "_id": "66056f78595b4f13e5b43111",
    "username": "marco",
    "email": "marco@gmail.com",
    "cars": [
      {
        "make": "Lamborghini",
        "model": "Aventador",
        "year": 2022,
        "_id": "66058dca9776944f3ea1f819"
      }
    ],
    "__v": 1
  }
]
```

Notes: </br> by default the amount of users returned is capped at 5 - in the example provided there is only one user in the database - to specify the amount of users returned, "results" query should be included:<code>.../api/users?results=10</code>

</br>

<li><b>Get car owner by car id:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/cars/owner/66058dca9776944f3ea1f819</code></br>
<em>Request method</em>: <b>
<span style="color: green;">GET</span>
</b></br>

<em>Response body:</em>

```json
{
  "_id": "66056f78595b4f13e5b43111",
  "username": "marco",
  "email": "marco@gmail.com",
  "cars": [
    {
      "make": "Lamborghini",
      "model": "Aventador",
      "year": 2022,
      "_id": "66058dca9776944f3ea1f819"
    }
  ],
  "__v": 1
}
```

</br>

<li><b>Get listings:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/listings</code></br>
<em>Request method</em>: <b>
<span style="color: green;">GET</span>
</b></br>

<em>Response body:</em>

```json
[
  {
    "car": {
      "make": "Lamborghini",
      "model": "Aventador",
      "year": 2022,
      "_id": "66058dca9776944f3ea1f819"
    },
    "owner": "66056f78595b4f13e5b43111",
    "price": 180000,
    "_id": "66058fe99776944f3ea1f824",
    "__v": 0
  }
]
```

Notes: </br> by default the amount of listings returned is capped at 5 - in the example provided there is only one listing in the database - to specify the amount of listings returned, "results" query should be included:<code>.../api/listings?results=10</code>

</br>

<li><b>Get listings by listing id:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/listings/66058fe99776944f3ea1f824</code></br>
<em>Request method</em>: <b>
<span style="color: green;">GET</span>
</b></br>

<em>Response body:</em>

```json
{
  "_id": "66058fe99776944f3ea1f824",
  "car": {
    "make": "Lamborghini",
    "model": "Aventador",
    "year": 2022,
    "_id": "66058dca9776944f3ea1f819"
  },
  "owner": "66056f78595b4f13e5b43111",
  "price": 180000,
  "__v": 0
}
```

</br>

<li><b>Change password:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/auth/change-password</code></br>
<em>Request method</em>: <b>
<span style="color: purple">PATCH</span>
</b></br>

<em>Request body</em>:

```json
{
  "oldPassword": "password",
  "newPassword": "new-password"
}
```

<em>Response body:</em>

```json
{
  "authentication": {
    "password": "49899853ddd257d6a224f5d88ad9722cee654e2a5e968fb29964569e09f73ee9",
    "salt": "fUhg7kAfqkDp8fzrx5CvTq/o0UiN5XcMrO5Qk8K9O5PPqHFEOWhLQnqwtc4Du/AV745br0bf/iha8UYWQ98CnqtK/HWA/pudGsnBVb7kWYZzkOCrL7Pidc/Q55e+dTvSRSSKDCeH0DrZ/pUKv3bH1ewTR5IAfRrumRCy8TwP9Zo="
  },
  "_id": "66056f78595b4f13e5b43111",
  "username": "marco",
  "email": "marco@gmail.com",
  "cars": [
    {
      "make": "Lamborghini",
      "model": "Aventador",
      "year": 2022,
      "_id": "66058dca9776944f3ea1f819"
    }
  ],
  "__v": 1
}
```

</br>

<li><b>Edit car:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/cars/update/66058dca9776944f3ea1f819</code></br>
<em>Request method</em>: <b>
<span style="color: purple">PATCH</span>
</b></br>

<em>Request body</em>:

```json
{
  "model": "Huracan"
}
```

<em>Response body:</em>

```json
{
  "make": "Lamborghini",
  "model": "Huracan",
  "year": 2022,
  "_id": "66058dca9776944f3ea1f819"
}
```

Notes: </br> car's changes will also affect the possible listing associated to the specified car

</br>

<li><b>Edit listing:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/listings/update/66058fe99776944f3ea1f824</code></br>
<em>Request method</em>: <b>
<span style="color: purple">PATCH</span>
</b></br>

<em>Request body</em>:

```json
{
  "price": 220000
}
```

<em>Response body:</em>

```json
{
  "_id": "66058fe99776944f3ea1f824",
  "car": {
    "make": "Lamborghini",
    "model": "Huracan",
    "year": 2022,
    "_id": "66058dca9776944f3ea1f819"
  },
  "owner": "66056f78595b4f13e5b43111",
  "price": 220000,
  "__v": 0
}
```

</br>

<li><b>Delete listing by listing id:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/listings/delete/66058fe99776944f3ea1f824</code></br>
<em>Request method</em>: <b>
<span style="color: red">DELETE</span>
</b></br>

<em>Response body:</em>

```json
{
  "_id": "66058fe99776944f3ea1f824",
  "car": {
    "make": "Lamborghini",
    "model": "Huracan",
    "year": 2022,
    "_id": "66058dca9776944f3ea1f819"
  },
  "owner": "66056f78595b4f13e5b43111",
  "price": 220000,
  "__v": 0
}
```

</br>

<li><b>Delete car by car id:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/cars/delete/66058dca9776944f3ea1f819</code></br>
<em>Request method</em>: <b>
<span style="color: red">DELETE</span>
</b></br>

<em>Response body:</em>

```json
{
  "make": "Lamborghini",
  "model": "Aventador",
  "year": 2022,
  "_id": "66058dca9776944f3ea1f819"
}
```
<li><b>Delete user by user id:</b></br>
<em>Path:</em> <code>http://localhost:8080/api/users/delete/66056f78595b4f13e5b43111</code></br>
<em>Request method</em>: <b>
<span style="color: red">DELETE</span>
</b></br>

<em>Response body:</em>

```json
{
    "_id": "66056f78595b4f13e5b43111",
    "username": "marco",
    "email": "marco@gmail.com",
    "cars": [],
    "__v": 4
}
```

### Authors
The project has been built with the contribution of:
[Marco Pagotto](https://github.com/marcopagotto)


### License
This project is available for use under the MIT License.