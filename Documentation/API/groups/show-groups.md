# Show Groups

Show all Groups of a User.

**URL** : `/api/groups/

**URL Query Parameters** : 
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
    "participant": "eliza",
    "participantPhoto": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "lastMessage": null,
    "lastMessageSent": null,
    "unreadMessages": 0
  },
  {
    "participant": "sarah",
    "participantPhoto": "https://images.unsplash.com/photo-1521252659862-eec69941b071?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=625&q=80",
    "lastMessage": null,
    "lastMessageSent": null,
    "unreadMessages": 0
  }
]
```
