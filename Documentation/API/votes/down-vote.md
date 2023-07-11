# Down vote a Post

Down votes a Post for the authenticated User.

**URL** : `/api/posts/:postId/down-vote/`

**URL Parameters** : `postId=[integer]` where `postId` is the ID of the Post in the database.

**Method** : `POST`

**Auth required** : YES


## Success Response

**Condition** : If everything is OK.

**Code** : `200 OK`

**Content example**

```json
{
  "id": 501,
  "content": "This is a comment that was created for testing purposes :)",
  "created": "2023-06-06T20:27:59.3180744Z",
  "author": "bob",
  "postId": 18
}
```