# Update Pet

Allow the Authenticated User to update his pet.

**URL** : `/api/pets/:petId

**URL Parameters** : `petId=[integer]` where `petId` is the ID of the Pet in the database.

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
{
  "Name": "[plain text]",
  "Type": "[plain text]",
  "gender": "[plain text]",
  "About": "[plain text]",
  "DateOfBirth": "[plain text]"
}
```

## Success Responses

**Condition** : Data provided is valid and User is Authenticated.

**Code** : `204 No Content`
