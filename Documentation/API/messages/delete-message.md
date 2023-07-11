# Delete Post's Comment

Delete a Message of the Authenticated User if they are author.

**URL** : `/api/messages/:messageId/`

**URL Parameters** : 
* `messageId=[integer]` where `messageId` is the ID of the Message in the database.

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : User is Message Author

## Success Response

**Condition** : If the Comment exists.

**Code** : `200 OK`
