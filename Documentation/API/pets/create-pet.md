# Create User's Pet

Create a Pet for the authenticated User.

**URL** : `/api/pets/`

**Method** : `POST`

**Auth required** : YES


**Data constraints**

Provide name of Pet to be created.

```json
{
  "Name": "[plain text]",
  "Type": "[plain text]",
  "gender": "[plain text]",
  "About": "[plain text]",
  "DateOfBirth": "[plain text]"
}
```

**Data example** 

```json
{
  "Name": "Snoopy",
  "Type": "Dog - Beagle",
  "gender": "female",
  "About": "He is a good boy",
  "DateOfBirth": "20-03-2013"
}
```

## Success Response

**Condition** : If everything is OK.

**Code** : `200 OK`

**Content example**

```json
{
  "id": 22,
  "name": "Snoopy",
  "type": "Dog - Beagle",
  "gender": "female",
  "about": "He is a good boy",
  "photo": "",
  "owner": "william",
  "age": 10,
  "created": "2023-07-07T22:17:30.3480796Z"
}
```