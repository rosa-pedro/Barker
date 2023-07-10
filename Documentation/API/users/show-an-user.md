# Show Users

Show a single User.

**URL** : `/api/users/:userName

**URL Parameters** : `:userName=[string]` where `userName` is the UserName of the User on the
server.`

**Method** : `GET`

**Auth required** : NO

## Success Responses

**Code** : `200 OK`

**Content example**
```json
{
  "id": "2",
  "userName": "william",
  "email": "williamreilly@caxt.com",
  "phoneNumber": "(924) 594-2161",
  "firstName": "William",
  "lastName": "Reilly",
  "gender": "male",
  "country": "Saint Kitts and Nevis",
  "city": "Herald",
  "about": "Eiusmod excepteur cupidatat nostrud nulla eu minim enim pariatur pariatur anim commodo amet duis. Dolore laborum exercitation magna voluptate non amet in veniam dolore. Consequat mollit reprehenderit deserunt ut dolore ipsum nisi voluptate consequat anim enim labore.\r\n",
  "photo": "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "age": 64,
  "numberOfPosts": 6,
  "numberOfPets": 11,
  "created": "2019-12-18T00:00:00Z",
  "lastActive": "2020-05-23T00:00:00Z"
}
```
