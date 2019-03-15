# Byob (Build Your Own Backend)
## An API For Vitamins And Their Treatments

### Base URL
```
GET https://byob-vitamins.herokuapp.com/api/v1/
```

<br/>

### Vitamins
#### GET
```
GET /api/v1/vitamins
```
Additionally, you can query a specific vitamin by its ID:
```
GET /api/v1/vitamins/{id}
```
#### POST
Post a new vitamin to the vitamins endpoint.
```
POST /api/v1/vitamins
```
Request body requires the following keys: name, treatment_id.
##### Response
An ID will be sent back upon a successful post response.
<br/>
###### Example response:
```
id: 31
```
#### DELETE
Delete an existing vitamin by querying it's ID.
```
DELETE /api/v1/vitamins/{id}
```
##### Response
An ID within a confirmation message will be sent back upon a successful deletion response.
<br/>
###### Example response:
```
Success: `Deleted vitamin with id 31`.
```

<br/>

### Treatments
#### GET
```
GET /api/v1/treatments
```
Specific treatments can also be queried by their ID:
```
GET /api/v1/treatments/{id}
```
#### POST
Post new treatment data to the treatments endpoint.
```
POST /api/v1/treatments
```
Request body requires the following keys: uses, side_effects.
##### Response
An ID will be sent back upon a successful post response.
<br/>
###### Example response:
```
id: 21
```
