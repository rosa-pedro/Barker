# Show An Post

Show a single Post.

**URL** : `/api/posts/:postId

**URL Parameters** : `:postId=[integer]` where `postId` is the ID of the Post on the
server.`

**Method** : `GET`

**Auth required** : NO

## Success Responses

**Code** : `200 OK`

**Content example**
```json
{
  "id": 9,
  "title": "Labore dolore laborum id cupidatat sint esse sint.",
  "content": "Pariatur ullamco cillum voluptate ad velit duis. Non exercitation minim irure ea non cillum anim incididunt eu reprehenderit ipsum enim in. Eu ea et laborum velit tempor Lorem esse. Esse irure laboris aute aliqua. Exercitation culpa voluptate veniam aute id adipisicing deserunt amet voluptate officia esse do labore.\r\nEu consectetur ad officia ut duis ex non tempor culpa commodo et excepteur. Exercitation incididunt eu consectetur minim culpa deserunt sit ea nisi culpa velit id. Officia proident eiusmod laboris velit. Sunt culpa anim sint adipisicing excepteur sit consectetur. Ex cupidatat officia exercitation non veniam ipsum ipsum incididunt consequat deserunt dolor enim voluptate in. Laboris exercitation voluptate amet eiusmod ullamco duis. Nisi dolor pariatur adipisicing consequat culpa amet laborum labore ex duis minim.\r\nLorem deserunt ad laboris Lorem sit velit aliquip. Qui aliquip elit ex esse pariatur. In sint qui labore esse cillum esse exercitation elit nostrud in nulla cupidatat.\r\n",
  "photo": "https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1229&q=80",
  "created": "2023-07-07T18:39:13.612281Z",
  "votes": -1,
  "comments": 20,
  "author": "figueroa",
  "authorPhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
}
```
