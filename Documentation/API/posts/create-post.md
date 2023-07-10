# Create User's Account

Create an Post for the authenticated User.

**URL** : `/api/posts/`

**Method** : `POST`

**Auth required** : YES


**Data constraints**

Provide title and content of Post to be created.

```json
{
  "title": "[plain text]",
  "content": "[plain text]"
}
```

**Data example** All fields must be sent.

```json
{
  "title": "Hello World",
  "content": "This is a post that was created for testing purposes :)"
}
```

## Success Response

**Condition** : If everything is OK.

**Code** : `200 OK`

**Content example**

```json
{
  "id": 31,
  "title": "Hello World",
  "content": "This is a post that was created for testing purposes :)",
  "photo": "",
  "created": "2023-07-09T18:55:37.9313567Z",
  "votes": 0,
  "comments": 0,
  "author": "william",
  "authorPhoto": "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
}
```