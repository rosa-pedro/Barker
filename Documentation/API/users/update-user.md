# Update Current User

Allow the Authenticated User to update their details.

**URL** : `/api/users/`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
{
    "first_name": "[1 to 30 chars]",
    "last_name": "[1 to 30 chars]",
    "phoneNumber": "932154321",
    "firstName": "[valid first name]",
    "lastName": "[valid last name]",
    "gender": "[valid gender]",
    "country": "[valid country]",
    "city": "[valid city]",
    "about": "[valid about text]",
    "dateOfBirth": "[valid birth date"
}
```

## Success Responses

**Condition** : Data provided is valid and User is Authenticated.

**Code** : `204 No Content`
