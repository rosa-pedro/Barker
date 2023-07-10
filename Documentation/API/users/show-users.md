# Show Users

Show all Users.

**URL** : `/api/users/`

**URL Query Parameters** : 
* `orderBy=[lastActive | created]` where `orderBy` sorts the Users shown.
* `pageSize=[int < 50]` where `pageSize` is the total of Users shown.
* `pageNumber=[int]` where `pageNumber` is which Users are shown.

**Method** : `GET`

**Auth required** : NO

## Success Responses

**Code** : `200 OK`

**Content example**
```json
[
  [
    {
      "id": "1",
      "userName": "queen",
      "email": "queenvaughn@caxt.com",
      "phoneNumber": "(862) 524-2490",
      "firstName": "Queen",
      "lastName": "Vaughn",
      "gender": "female",
      "country": "South Africa",
      "city": "Crumpler",
      "about": "Reprehenderit amet sint ad exercitation labore quis qui anim ex proident est Lorem. Mollit magna quis eu sunt nisi qui dolore tempor eiusmod consectetur irure. Proident cupidatat dolore anim quis sit. Officia qui cupidatat deserunt enim proident esse id mollit elit ut sunt. Aliqua irure adipisicing deserunt aliquip consequat adipisicing nulla non fugiat sint ad tempor consequat non. Fugiat dolor adipisicing sint ex aliqua enim dolore proident laboris reprehenderit duis. Sint mollit adipisicing enim id.\r\n",
      "photo": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "age": 58,
      "numberOfPosts": 3,
      "numberOfPets": 2,
      "created": "2020-02-19T00:00:00Z",
      "lastActive": "2020-06-21T00:00:00Z"
    },
    {
      "id": "3",
      "userName": "sarah",
      "email": "sarahbuckner@caxt.com",
      "phoneNumber": "(823) 505-2133",
      "firstName": "Sarah",
      "lastName": "Buckner",
      "gender": "female",
      "country": "Nigeria",
      "city": "Curtice",
      "about": "Cupidatat qui id culpa fugiat exercitation laborum ullamco sit sunt proident ut amet nulla incididunt. Ad sint sit ut et labore cillum elit esse commodo cupidatat tempor minim. Magna voluptate sint consectetur ad sint officia pariatur consequat dolore velit. Laboris magna qui laboris veniam. Do nisi deserunt exercitation tempor velit consectetur velit do elit dolor. Minim laborum deserunt laboris tempor aute veniam est laboris.\r\n",
      "photo": "https://images.unsplash.com/photo-1521252659862-eec69941b071?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=625&q=80",
      "age": 65,
      "numberOfPosts": 0,
      "numberOfPets": 3,
      "created": "2019-10-31T00:00:00Z",
      "lastActive": "2020-06-19T00:00:00Z"
    }
  ]
]
```
