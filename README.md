# ClassicRP

A platform to facilitate the cooperative writing hobby on forums of old. There's still a lot of interest but not a lot of good options for those who enjoy.
This project should build a platform that is specificially tailored to facilitate many kinds of cooperative writing or roleplay. 

## API

## Auth
### All apis that require authentication
All apis that require a current logged in user.

* Request: apis that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "errors":
      {
        "message": "Unauthorized"
      }
    }
    ```

### All apis that require proper authorization
All apis that require authentication and the current user does not have the
correct permission to view.

* Request: apis that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get all Users
Returns the information about the all users

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/users
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "users": [
        {
          "id": 1,
          "email": "john.smith@gmail.com",
          "username": "JohnSmith"
        }
      ]
    }
    ```

### Get an User with Specific id
Returns the information about a user of a specific id

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/users/:userId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "email": "john.smith@gmail.com",
      "username": "JohnSmith"
    }
    ```

### Log In a User
Logs in a current user with email and password and returns the user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "email": "john.smith@gmail.com",
      "username": "JohnSmith"
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json    {
      "error": "No such user exists.",
      // or
      "error": "Password was incorrect."
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "email is required" /*or*/ "Email provided not found.",
        "password": "password is required"
      }
    }
    ```

### Log out
Log the current user out.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/auth/logout
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User logged out"
    }
    ```

### Sign Up a User
Create a new user, log in, and return the user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/signup
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "email": "john.smith@gmail.com",
      "username": "JohnSmith"
    }
    ```

* Error response: Validation Errors
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "errors": {
        "username": [
          "This field is required", // or
          "Username is already in use."
        ], // and/or
        "email": [
          "This field is required", // or
          "Email address is already in use."
        ], // and/or
        "password": [
          "This field is required"
        ]
      }
    }
    ```

## Category
### Get Categories
* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/categories
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	"category":[
		{
			"id": 1,
			"name": "Fantasy",
			"description": "A place for stories steeped in technological fantasy",
			"options": "{'Test_Option':'1'}"
          "order": 2
		}
	]
    }
    ```

### Get Category 
* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/categories/:id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	   "category":{
         "options": "{json}",
             "Topics": [
                "subject": "Test topic",
                "user_id": "1",
                "username": "demo-lition"
             ]
       }
    }
    ```

## Topics
### Get Topics
    * Require Authentication: false
* Request
  * Method: GET
  * URL: /api/topic/:id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	   "topic":{
         "id": 1,
          "subject": "Fantasy Topic",
          "body": "Writing a fantasy topic",
          "user_id": 1,
          "username": "Demo-lition",
          "option": "{json}",
          "category_id": 2,
          "created_at": "datestring",
          "Posts": [
            {
               "id": 3,
                "body": "unicorns fly",
                "user_id": 2,
                "options": "{json}"
             }
          ]
       }
    }
    ```
### Create Topic
    * Require Authentication: true
* Request
  * Method: POST
  * URL: /api/topic/
  * Body:
  ```json
  {
     "subject": "Fantasy Topic",
    "body": "Writing a fantasy topic",
    "user_id": 1,
    "option": "{json}",
    "category_id": 2
  }
  ```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body: None


### Update Topic
    * Require Authentication: true
* Request
  * Method: PUT
  * URL: /api/topic/:id
  * Body:
  ```json
  {
     "subject": "Fantasy Topic",
    "body": "Writing a fantasy topic",
    "option": "{json}",
    "category_id": 2
  }
  ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body: None
 
### Delete Topic
    * Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/topic/:id
  * Body: None
 
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body: None
 

## Posts
### Create Post
    * Require Authentication: true
* Request
  * Method: POST
  * URL: /api/post/
  * Body:
  ```json
  {
    "body": "Writing a fantasy topic",
    "user_id": 1,
    "option": "{json}",
    "topic_id": 2
  }
  ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body: None
 
### Update Post
    * Require Authentication: true
* Request
  * Method: UPDATE
  * URL: /api/post/:id
  * Body:
  ```json
  {
    "body": "Writing a fantasy topic",
    "user_id": 1,
    "option": "{json}",
    "topic_id": 2
  }
  ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body: None
 
### 
