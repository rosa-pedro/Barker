# Delete User's Pet

Delete the Pet of the Authenticated User if they are owner.

**URL** : `/api/posts/:petId/`

**URL Parameters** : `petId=[integer]` where `petId` is the ID of the Pet in the database.

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : User is Pet Owner

## Success Response

**Condition** : If the Pet exists.

**Code** : `200 OK`
