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

| HTTP Verbs | Endpoints           | Action                                                                                                         | Restrictions                                                                                    |
| ---------- | ------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| POST       | /api/auth/register  | To create a new user                                                                                           | No restrictions                                                                                 |
| POST       | /api/auth/login     | To authenticate the user                                                                                       | No restrictions                                                                                 |
| POST       | /api/cars/:id       | To add a car to the user associated with the provided id                                                       | <ul><li>User must be authenticated<ul>                            |
| POST       | /api/listings       | To post a listing                                                                                              | <ul><li>User must be authenticated <li>User must be car owner<ul> |
| GET        | /api/users?results  | To retrive the registered users - the amount of users returned can be specified as a number in "results" query | <ul><li>User must be authenticated<ul>                                                          |
| GET        | /api/cars/owner/:id | To retrive the user owning the car with the specifeid id                                                       | <ul><li>User must be authenticated<ul>                                                          |
| GET        | /api/listings?results       | To retrive listings - the amount of listings returned can be specified as a number in "results" query                                                                     | No restrictions                                                                                 |
| GET | /api/listings/:id | To retrive the listing with the specified id | <ul><li>User must be authenticated</ul>
| PATCH | /api/auth/change-password | To update the password of the authenticated user | <ul><li>User must be authenticated</ul>
| PATCH | /api/cars/:id | To update the fields of the car with the specified id | <ul><li>User must be authenitcated<li>User must be car owner</ul>
| PATCH | /api/listings/:id | To update the listing with the specified id | <ul><li>User must be authenticated<li>User must be listing owner</ul>
| DELETE     | /api/users/:id      | To delete the user with the specified id </br></br> <em>Performing such action will also delete all users' listings and will clear authentication cookies</em>                                                            | <ul><li>User must be authenticated </ul>                           |
DELETE | /api/cars/:id | To delete the car with the specified id </br></br> <em>Performing such action will also delete, if exists, the listing associated with the car</em> | <ul><li>User must be authenticated <li> User must be car owner</ul> |
DELETE | /api/listings/:id | To delete the listing with the specified id | <ul><li>User must be authenticated<li>User must be listing owner</ul> |
