# BYOB

## Build-your-own-backend

* * *

### RESTful API with multiple endpoints for vitamins and treatments.

### Base Endpoint
```
https://byob-vitamins.herokuapp.com/api/v1/
```

### Features

*   RESTful API
*   CRUD endpoints
*   HTTP Methods: GET, DELETE & POST

### Tech Stack

*   Node & Express
*   Knex
*   PostreSQL

### Documentation

#### Vitamins ~ GET

Get all vitamins:
```
/api/v1/vitamins
```
Query by ID:
```
/api/v1/vitamins/{id}
```

#### Vitamins ~ POST

```
/api/v1/vitamins
```

Request body requires the following keys: name, treatment_id. An ID will be sent back upon a successful post response.

#### Vitamins ~ DELETE

Query by ID:
```
/api/v1/vitamins/{id}
```

An ID will be sent back upon a successful post response.

#### Treatments ~ GET

Get all treatments:
```
/api/v1/treatments
```

Query by ID:
```
GET /api/v1/treatments/{id}
```

#### Treatments ~ POST

```
POST /api/v1/treatments
```

Request body requires the following keys: uses, side_effects. An ID will be sent back upon a successful post response.

### Contributors

* [Shannon Moranetz](https://github.com/shannonmoranetz)