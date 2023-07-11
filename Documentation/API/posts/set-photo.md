# Set User's Profile Photo

Set an photo for the authenticated User.

**URL** : `/api/users/set-profile-photo`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

Provide photo file inside a _**multipart/form-data**_ in _**.jpg**_ format.

```
    "Photo": "[photo file in jpg]"
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
  "id": "11",
  "userName": "bob",
  "email": "bob@email.com",
  "phoneNumber": "",
  "firstName": "",
  "lastName": "",
  "gender": "",
  "country": "",
  "city": "",
  "about": "",
  "photo": "https://localhost:7049/images/f1e1fbb9-cc6a-4aba-b850-a69ac8ec2bdd.jpg",
  "age": 0,
  "created": "2023-06-22T19:26:07.034664Z",
  "lastActive": "2023-06-22T19:26:07.034664Z"
}
```
