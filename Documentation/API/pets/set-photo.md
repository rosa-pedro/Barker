# Set Pet's Profile Photo

Set an pet's photo for the authenticated User.

**URL** : `/api/pets/:petId/set-profile-photo`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

Provide photo file inside a _**multipart/form-data**_ in _**.jpg**_ format.

```
    "Photo": "[photo file in jpg]"
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
  "id": 1,
  "name": "Scoooby doO!",
  "type": "Vira lata",
  "about": "He is a very good boy",
  "photo": "https://localhost:7049/images/1c334792-e25a-4129-b606-ccb50370ac0b.jpg",
  "owner": "bob",
  "age": 10,
  "created": "2023-06-07T11:05:07.89084Z"
}
```
