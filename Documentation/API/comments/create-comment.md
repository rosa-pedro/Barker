# Create Post's Comment

Create an Comment in an Post for the authenticated User.

**URL** : `/api/posts/:postId/comments/`

**URL Parameters** : `postId=[integer]` where `postId` is the ID of the Post in the database.

**Method** : `POST`

**Auth required** : YES


**Data constraints**

Provide content of Comment to be created.

```json
{
  "content": "[plain text]"
}
```

**Data example** All fields must be sent.

```json
{
  "content": "This is a comment that was created for testing purposes :)"
}
```

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