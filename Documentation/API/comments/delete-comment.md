# Delete Post's Comment

Delete the Comment in an Post of the Authenticated User if they are owner.

**URL** : `/api/posts/:postId/comments/:commentId`

**URL Parameters** : 
* `postId=[integer]` where `postId` is the ID of the Post in the database.
* `commentId=[integer]` where `commentId` is the ID of the Comment in the database.

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : User is Comment Owner

## Success Response

**Condition** : If the Comment exists.

**Code** : `200 OK`
