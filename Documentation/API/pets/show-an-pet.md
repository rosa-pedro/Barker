# Show An Pet

Show a single Pet.

**URL** : `/api/pets/:petId

**URL Parameters** : `:petId=[integer]` where `petId` is the ID of the Pet on the
server.`

**Method** : `GET`

**Auth required** : NO

## Success Responses

**Code** : `200 OK`

**Content example**
```json
{
  "id": 23,
  "name": "scooby doo",
  "type": "great dane",
  "gender": "male",
  "about": "He is a great boy, becuase.... you know... he is a great dane :D ",
  "photo": "",
  "owner": "william",
  "age": 3,
  "created": "2023-07-08T17:25:59.791099Z"
}
```
