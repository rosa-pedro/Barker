# Delete User's Post

Delete the Post of the Authenticated User if they are owner.

**URL** : `/api/posts/:postId/`

**URL Parameters** : `postId=[integer]` where `postId` is the ID of the Post in the database.

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : User is Post Owner

## Success Response

**Condition** : If the Post exists.

**Code** : `200 OK`
