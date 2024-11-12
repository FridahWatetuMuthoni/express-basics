# Express Notes

## Installs

```bash

npm install -D nodemon
npm install express
npm install express-validator

```

## Methods

### express.json()

express.json([options])

This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body), or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.

## express methods

```javascript
app.get("/", (req, res) => {
  /* */
});
app.post("/", (req, res) => {
  /* */
});
app.put("/", (req, res) => {
  /* */
});
app.delete("/", (req, res) => {
  /* */
});
app.patch("/", (req, res) => {
  /* */
});
```

## Query Params

?sort=asc

## The Request Object Contains

1. url
2. method
3. statusCode
4. params
5. query
6. body
7. route:Route{
   path:"/api/users",
   stack:[],
   methods:[]
   }

## sessions

sessions represent the duration of a user on a website
authentication => generate a session id => returns a cookie with the session id

## Before Deleting middlewares and errors

```javascript
const express = require("express");

const app = express();

const { userRouter } = require("./routes/users");

/*================== MIDDLEWARES ==================*/

//for parsing json data
app.use(express.json());

const loginMiddleware = (request, response, next) => {
  //you call next when you are done with the middleware
  console.log(`${request.method} - ${request.url}`);
  next();
};

const homeMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url} - Homepage`);
  next();
};

//registering a middleware globally
//middlewares must be registered before the routes
app.use(loginMiddleware);

const PORT = process.env.PORT || 3000;

/*================== USER REQUESTS ==================*/

app.use(userRouter);

/*================== GET REQUESTS ==================*/

//using a middleware for a specific root
app.get("/", homeMiddleware, (req, res) => {
  res.send("hello world");
});

/*================== AUTHENTICATION ==================*/

app.post("/api/auth", (request, response) => {
  const {
    body: { username, password },
  } = request;
  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password) {
    return response.status(401).send({ err: "BAD CREDENTIALS" });
  }
  request.session.user = findUser;
  return response.status(200).send(findUser);
});

/*================== HANDLING ERRORS ==================*/

// 404 ERROR
app.use((req, res, next) => {
  res.status(404);
  res.send("Oops sorry, page not found");
});

// 500 ERROR
app.use((req, res, next) => {
  res.status(500);
  res.send("Server Error");
});

/*================== SERVER LISTENING ==================*/

app.listen(PORT, () => {
  console.log(`server is running on: http://localhost:3000`);
});
```

## POST Request with validators

```javascript
/*================== POST REQUESTS ==================*/

app.post(
  "/api/users",
  [
    body("username")
      .notEmpty()
      .withMessage("username should not be empty")
      .isString()
      .withMessage("username should be a string")
      .isLength({ min: 5, max: 32 })
      .withMessage(
        "username must be at least 5 characters with a max of 32 characters"
      ),

    body("email")
      .notEmpty()
      .withMessage("email should not be empty")
      .isEmail()
      .withMessage("email must be a valid email address"),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // Return validation errors if any
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);

    const { username, email } = data;
    const newUser = {
      id: users.length + 1,
      username,
      email,
    };
    users.push(newUser);
    console.log(users);
    return res.status(201).send(newUser); // Sets status and sends response
  }
);
```
