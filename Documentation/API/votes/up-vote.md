# Up vote a Post

Up votes a Post for the authenticated User.

**URL** : `/api/posts/:postId/up-vote/`

**URL Parameters** : `postId=[integer]` where `postId` is the ID of the Post in the database.

**Method** : `POST`

**Auth required** : YES


## Success Response

**Condition** : If everything is OK.

**Code** : `200 OK`

**Content example**

```json
{
  "postId": 30,
  "totalVotes": 1,
  "vote": 1,
  "voter": "bob"
}
```