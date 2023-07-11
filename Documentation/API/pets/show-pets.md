# Show Pets

Show all Pets.

**URL** : `/api/pets/`

**URL Query Parameters** : 
* `owner=[string]` where `owner` is the User on the server.
* `pageSize=[int < 50]` where `pageSize` is the total of Posts shown.
* `pageNumber=[int]` where `pageNumber` is which Posts are shown.

**Method** : `GET`

**Auth required** : NO

## Success Responses

**Code** : `200 OK`

**Content example**
```json
[
  {
    "id": 7,
    "name": "melody",
    "type": "cupidatat",
    "gender": "female",
    "about": "Consectetur ea enim sit culpa pariatur. Ipsum dolore ut voluptate tempor voluptate officia reprehenderit eiusmod dolor reprehenderit occaecat cillum. Commodo eiusmod dolor veniam pariatur nisi duis nostrud.",
    "photo": "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    "owner": "william",
    "age": 1,
    "created": "2023-07-08T17:50:53.642869Z"
  },
  {
    "id": 9,
    "name": "hinton",
    "type": "id",
    "gender": "male",
    "about": "Fugiat velit elit esse esse cillum consectetur incididunt culpa id laborum. Irure voluptate irure ad adipisicing. Do excepteur irure incididunt proident do eu id nostrud deserunt reprehenderit anim nisi.",
    "photo": "https://images.unsplash.com/photo-1553736026-ff14d158d222?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "owner": "william",
    "age": 8,
    "created": "2023-07-08T17:50:53.642874Z"
  },
  {
    "id": 22,
    "name": "asd",
    "type": "asd",
    "gender": "",
    "about": "",
    "photo": "",
    "owner": "william",
    "age": 3,
    "created": "2023-07-08T17:51:23.803202Z"
  }
]
```
