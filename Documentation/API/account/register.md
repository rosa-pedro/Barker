# Register

Used to register an User.

**URL** : `/api/account/register/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "UserName": "[valid user name]",
    "Email": "[valid email address]",
    "Password": "[password in plain text]"
}
```

**Data example**

```json
{
    "UserName": "Bob", 
    "Email": "bob@email.com",
    "Password": "Pa$$w0rd"
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

**Condition** : If 'username' is already taken or 'password' is weak.

**Code** : `400 BAD REQUEST`

