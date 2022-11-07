# Question Answer Backend Rest API

## Questions

#### Public Operations

- List all questions
   * Paginate and  Limit number of Questions 
   * Sorting Questions By Most-Answered, Most-Liked or More Recent
   * Searching Questions By Title
   * Population User Of The Question

#### Private Operations

- Create a New Question
  * Authenticated users only (Logged In Users) 
- Edit a Question
  * Owner User Only
- Delete a Question
  * Owner User Only
- Like a Question
  * Authenticated user only
  * Only 1 Like Per User
- Undo Like a Question
  * Authenticated user only
  * Only Applicable To Question That Liked Before

## Answers

#### Public Operations
- Get All Answers by Question Id
- Get Single Answer By Answer Id

#### Private Operations
- Add (Create) a New Answer To Question
  * Authenticated users only (Logged In Users) 
- Edit a Answer
  * Owner User Only
- Delete a Answer
  * Owner User Only
- Like a Answer
  * Authenticated user only
  * Only 1 Like Per User
- Undo Like a Answer
  * Authenticated user only
  * Only Applicable To Answer That Liked Before

## Users

#### Public Operations

- List all Users
  * Paginate and  Limit number of Users 
  * Search By name
- Get User Profile

#### Private Operations

- Block A User
- Delete A User

## Authentication

- Authentication Strategy : JWT and Cookie
  * JWT and Cookie Expiration : 30 Minutes For Testing Api
- Registration
  * User can register as a "Admin" or simply "User"
  * Password Hash
  * Token includes : "id" and "name"
  * Token Are Stored In Cookie  
- Login
  * User can login with "email" and "password"
  * Everytime a user login, new Token are sent to to client and stored in cookie.
- Logout
  * Token set to null in cookie.
- Forgot Password
  * Reset Password Token send to client via email.
  * This token expires in 1 hour.
- Reset Password
  * Reset Password Token can be used in 1 hour.
  * User can set a new password using this token.
- Update User Details (Bio)
  * Users can add their bio details when logged in.
- User Profile
  * Users can view their personal information after they login.
- Profile Photo Upload
  * Users can upload an avatar for their profile.
## Models

#### User
#### Answer
#### Question


## Middlewares

#### Authorization

- Middlewares That Protect Routes From Unauthorized Access
  * getAccessToRoute
  * getAdminAccess
  * getQuestionOwnerAccess
  * getAnswerOwnerAccess

#### Database

- Middlewares That Check Entities Exist With Given Ids
  * checkQuestionAndAnswerExist
  * checkQuestionExist
  * checkUserExist

#### Error 

- Middleware That Captures All Errors
  * errorHandler

#### Query

- Middleware That Provides Advance Query Functionalities
  * answerQueryMiddleware
  * questionQueryMiddleware
  * userQueryMiddleware

#### Security
- Middleware That Provides Security to Rest Api
  * limitAccess
  * hpp
  * cors
  * helmet
  * mongoSanitize

## Helper Functions and Classes

#### Database

- connectDatabase
  * MongoDb Connection


#### Error

- customError
  * Customized Error Class
- errorWrapper
  * Function that catches asynchronous errors

#### 3rd Party Libraries

- photoUpload
  * Helper Function That Customized Upload Process with Multer Package
- sendEmail
  * Helper Function That Customized 
  Mail Process with NodeMailer Package



