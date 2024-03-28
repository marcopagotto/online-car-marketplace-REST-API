# Online Car Marketplace REST API

### Introduction

Online Car Marketplace REST API is an open source platform that enables car owners to connect to potential customers who may be interested in purchasing cars found in listings.

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

<em>Response:</em>

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

<em>Response:</em>

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
AUTH-LOGIN | 736ef707293451d0c8ef<br>79f65f94c15b450cebb2<br>4ffa7c99173c86810d36<br>3a04|localhost|/|Session|false|false|
