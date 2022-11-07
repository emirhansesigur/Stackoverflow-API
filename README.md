# Question Answer Backend Rest API

In this project, I created a backend Rest API that includes basic functionalities that a Q&A website provides. While doing that I tried to copy stackoverflow.com ‘s functionality which all programmers know and can anticipate how its operations run.

Feel free to use this API when you create your UI projects.

#### Some of the features:
- Database connection
- Login, Logout User
- Register a User
- Ask, Answer Question
- Like, Dislike Answer
- As an Admin delete User
- Forgot Password by sending token to email
- Get Questions

Of course, while doing all those features there are lots of backend kinds of details. To check then click [Here](./specifications.md) and see all the qualification that the API has.

## Dependencies
- [expressjs]
- [jsonwebtoken] - For generating JWTs used by authentication
- [mongoose] - For MongoDB
- [slugify] - For encoding titles into a URL
- [bcryptjs] - Hashing Password
- [dotenv]
- [multer] - Node.js middleware for uploading files
- [nodemailer] - To Send e-mails from Node.js

### Thanks

I finished this project with [Mustafa Murat Çoşkun](https://github.com/mustafamuratcoskun)'s help. I appreciate him for all his efforts. [Here](https://www.udemy.com/course/komple-sifirdan-web-gelistirme-kursu/) it is the tutorial I has followed.
