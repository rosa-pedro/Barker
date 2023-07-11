# Show Comments

Show all Comments of Post.

**URL** : `/api/posts/:postId/comments/

**URL Parameters** : `postId=[integer]` where `postId` is the ID of the Post in the database.`

**URL Query Parameters** : 
* `userName=[string]` where `userName` is the UserName of the User on the server.
* `orderBy=["newest" | "oldest"]`where `orderBy` sorts the Posts shown.
* `pageSize=[integer < 50]` where `pageSize` is the total of Posts shown.
* `pageNumber=[integer]` where `pageNumber` is which Posts are shown.

**Method** : `GET`

**Auth required** : NO

## Success Responses

**Code** : `200 OK`

**Content example**
```json
[
  {
    "id": 188,
    "content": "Lorem laborum nostrud sint id proident fugiat qui non labore esse nisi anim adipisicing occaecat. Sint commodo consectetur laborum est aute enim in aute nisi nulla mollit non commodo eu. Eiusmod tempor et esse sunt deserunt nulla consectetur Lorem deserunt ipsum labore deserunt minim quis. Qui irure in magna nisi velit commodo commodo id esse ipsum duis veniam. Sint laboris dolore ex quis commodo id dolore commodo anim reprehenderit ut Lorem. Qui non laboris reprehenderit voluptate laboris do elit eiusmod magna.\r\n",
    "created": "2023-06-25T23:12:07.918528Z",
    "author": "eliza",
    "authorPhoto": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "postId": 18
  },
  {
    "id": 245,
    "content": "Cillum ut excepteur cillum fugiat Lorem quis consectetur proident et esse non enim velit. Sit esse aliqua elit consequat. Sunt nisi Lorem sunt consequat id mollit.\r\n",
    "created": "2023-06-11T23:12:07.918601Z",
    "author": "frazier",
    "authorPhoto": "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "postId": 18
  },
  {
    "id": 302,
    "content": "Exercitation officia est nulla aliquip tempor non officia pariatur reprehenderit ipsum est. Ut ad do ea nulla enim. Non veniam sit ipsum tempor exercitation dolore cupidatat excepteur mollit. Commodo elit sit ea Lorem dolore ad voluptate.\r\n",
    "created": "2023-06-05T23:12:07.918684Z",
    "author": "hobbs",
    "authorPhoto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "postId": 18
  }
]
```
