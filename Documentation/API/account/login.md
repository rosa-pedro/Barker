# Login

Used to collect a Token for a registered User.

**URL** : `/api/account/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "UserName": "[valid user name]",
    "Password": "[password in plain text]"
}
```

**Data example**

```json
{
    "username": "bob",
    "password": "Pa$$w0rd"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "userName": "bob",
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `401 Unauthorized`

**Content** :

```json
{
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Password": [
      "The Password field is required.",
      "The field Password must be a string or array type with a minimum length of '6'."
    ],
    "UserName": [
      "The UserName field is required."
    ]
  }
}
```
