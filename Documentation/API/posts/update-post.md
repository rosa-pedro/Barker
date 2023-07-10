# Update Post

Allow the Authenticated User to update his post.

**URL** : `/api/posts/:postId`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
{
  "title": "Updated Hello World",
  "content": "This is an updated post that was created for testing purposes :)"
}
```

## Success Responses

**Condition** : Data provided is valid and User is Authenticated.

**Code** : `204 No Content`
