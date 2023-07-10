# Show Messages

Show all Messages of a User.

**URL** : `/api/messages/

**URL Query Parameters** : 
* `container=["unread" | "inbox" | "outbox"]` where `container` is the category of Messages on the server.
* `pageSize=[integer < 50]` where `pageSize` is the total of Messages shown.
* `pageNumber=[integer]` where `pageNumber` is which Messages are shown.

**Method** : `GET`

**Auth required** : NO

## Success Responses

**Code** : `200 OK`

**Content example**
```json
[
  {
    "id": 2,
    "senderId": 2,
    "senderUserName": "william",
    "senderPhoto": "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "recipientId": 6,
    "recipientUserName": "frazier",
    "recipientPhoto": "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "content": "Test message 1 from bob to william",
    "dateRead": null,
    "messageSent": "2023-07-10T21:09:41.659364Z"
  },
  {
    "id": 1,
    "senderId": 2,
    "senderUserName": "william",
    "senderPhoto": "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "recipientId": 3,
    "recipientUserName": "sarah",
    "recipientPhoto": "https://images.unsplash.com/photo-1521252659862-eec69941b071?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=625&q=80",
    "content": "Test message 1 from bob to william",
    "dateRead": null,
    "messageSent": "2023-07-10T21:08:42.833029Z"
  }
]
```
