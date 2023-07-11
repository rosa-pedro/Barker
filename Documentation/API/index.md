# REST API Documentation 

The application should be running on https://localhost:7049.

There is also a [json file](insomnia_barker.json) with all the endpoints to test on [Insomnia](https://insomnia.rest/).


## Open Endpoints

Open endpoints require no Authentication.

### Account related

Endpoints for viewing and manipulating the Accounts.

* [Login](account/login.md) : `POST /api/account/login/`
* [Register](account/register.md) : `POST /api/account/register/`
* [Is UserName Available](account/is-username-available.md) : `GET /api/account/is-available/:userName/`

### User related

Each endpoint displays information related to the Users.

* [Show Users](users/show-users.md) : `GET /api/users/`
* [Show An User](users/show-an-user.md) : `GET /api/users/:userName/`

### Post related

Endpoints for viewing the Posts.

* [Show Posts](posts/show-posts.md) : `GET /api/posts/`
* [Show An Post](posts/show-an-post.md) : `GET /api/posts/:postId/`

### Pet related

Each endpoint displays information related to the Pets.

* [Show Pets](pets/show-pets.md) : `GET /api/pets/`


## Endpoints that require Authentication

Closed endpoints require a valid **_Bearer Token_** to be included in the header of the request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose Token is provided with the request:

* [Update Info](users/update-user.md) : `PUT /api/users/`
* [Set Photo](users/set-photo.md) : `POST /api/users/set-profile-photo`
* [Delete Photo](users/delete-photo.md) : `DELETE /api/users/delete-profile-photo`

### Post related

Endpoints for viewing and manipulating the Posts that the Authenticated User has permissions to access.

* [Show An Post](posts/show-posts.md) : `GET /api/posts/:postId/`
* [Create Post](posts/create-post.md) : `POST /api/posts/`
* [Update An Post](posts/update-post.md) : `PUT /api/posts/:postId/`
* [Delete An Post](posts/delete-post.md) : `DELETE /api/posts/:postId/`
* [Set Photo](posts/set-photo.md) : `POST /api/posts/:postId/set-featured-photo/`
* [Delete Photo](posts/delete-photo.md) : `DELETE /posts/:postId/delete-featured-photo/`

### Comment related

Endpoints for viewing and manipulating the Comments that the Authenticated User has permissions to access.

* [Show Comments](comments/show-comments.md) : `GET /api/posts/:postId/comments/`
* [Create Comment](comments/create-comment.md) : `POST /api/posts/:postId/comments/`
* [Delete An Comment](comments/delete-comment.md) : `DELETE /api/posts/:postId/comments/`

### Vote related

Endpoints for up voting or down voting the Posts that the Authenticated User has permissions to do.

* [Up Vote](votes/up-vote.md) : `Post /api/posts/:postId/up-vote/`
* [Down Vote](votes/down-vote.md) : `POST /api/posts/:postId/down-vote/`

### Pet related

Endpoints for viewing and manipulating the Pets that the Authenticated User has permissions to access.

* [Show Pets](pets/show-pets.md) : `GET /api/pets/`
* [Show An Pet](pets/show-an-pet.md) : `GET /api/pets/:petId/`
* [Create Pet](pets/create-pet.md) : `POST /api/pets/`
* [Update An Pet](pets/update-pet.md) : `PUT /api/pets/:petId/`
* [Delete An Pet](pets/delete-pet.md) : `DELETE /api/pets/:petsId/`
* [Set Photo](pets/set-photo.md) : `POST /api/pets/:petId/set-profile-photo/`
* [Delete Photo](pets/delete-photo.md) : `DELETE /pets/:petId/delete-profile-photo/`

### Message related

Endpoints for viewing and manipulating the Messages that the Authenticated User has permissions to access.

* [Show Messages](messages/show-messages.md) : `GET /api/messages/`
* [Create Message](messages/create-message.md) : `POST /api/messages`
* [Delete An Message](messages/delete-message.md) : `DELETE /api/messages/`

### Group related

Endpoints for viewing the Groups that the Authenticated User has permissions to access.

* [Show Groups](groups/show-groups.md) : `GET /api/groups/`
