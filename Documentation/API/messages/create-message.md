# Create Message

Create an Message to a User from the authenticated User.

**URL** : `/api/messages/`

**Method** : `POST`

**Auth required** : YES


**Data constraints**

Provide content of Comment to be created.

```json
{
    "recipientUsername": "[plain text]",
    "content": "[plain text]"
}
```

**Data example** All fields must be sent.

```json
{
  "recipientUsername": "william",
  "content": "Test message 1 from bob to william"
}
```

## Success Response

**Condition** : If everything is OK.

**Code** : `200 OK`

**Content example**

```json
{
  "id": 2,
  "senderId": 11,
  "senderUserName": "bob",
  "senderPhoto": "",
  "recipientId": 2,
  "recipientUserName": "william",
  "recipientPhoto": "",
  "content": "Test message 1 from bob to william",
  "dateRead": null,
  "messageSent": "2023-06-22T20:42:35.2018333Z"
}
```