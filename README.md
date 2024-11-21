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

## The Parts of a URL

https://localhost:3000/about?test=1#history

i. https => is the protocal in which data is transmitted
ii. localhost => this is the host and it is essentially where the server is located. The domain names are translated to IP addresses by the DNS (Domain Name System).
iii. 3000 => each server has a collection of numbered ports.some port numbers are special like 83 and 443. if you omit the port, port 80 is assumed for http and 443 is assumed for https. If you aint using port 80 or 443, you need to specify a port that is greater than 1023.
The port number is used to identify the process that is running on the server.
iv. about => this is the path. The path is the part of the URL that identifies the resource that you want to access. The path is usually a string of characters that is separated by a slash (/ ). The path can be empty, or it can be a single slash (/) to indicate the root of the server.
v. ?test=1 => The querystring is an optional collection of name/value pairs. The querystring starts with a question mark (?), and name/value pairs are separated by ampersands (&). The name/value pairs are separated by equals signs (=). The querystring is used to pass data from the client to the server.In this case the name/value pair is test=1, test is the name and 1 is the value.
vi. #history => The fragment (or hash) is not passed to the server at all: it is strictly for use by the browser. It is becoming increasingly common for single-page applications or AJAXheavy applications to use the fragment to control the application. Originally, the fragment’s sole purpose was to cause the browser to display a specific part of the document, marked by an anchor tag (<a id="chapter06">).

## The http methods

The HTTP protocol defines a collection of request methods (often referred to as HTTP methods, HTTP verbs, or simply HTTP methods) that can be used to interact with resources on the server. The most common HTTP methods are :

- GET: This method is used to retrieve a resource from the server. It is the most common HTTP method and is used to retrieve data from the server.

- POST: This method is used to send data to the server to create a new resource. It is used to send data to the server to create a new resource.

- PUT: This method is used to update an existing resource on the server. It is used to update an existing resource on the server.

- DELETE: This method is used to delete a resource from the server. It is used to delete a resource from the server.

- HEAD: This method is used to retrieve metadata about a resource from the server. It is used to retrieve metadata about a resource from the server.

## The request Object

The request object (which is normally passed to a callback, meaning you can name it whatever you want: it is common to name it req or request) starts its life as an instance of http.IncomingMessage, a core Node object. Express adds additional functionality.

1. request.params => An array containing the named route parameters.
2. request.query => An object containing querystring parameters (sometimes called GET parameters) as name/value pairs.
3. request.body => An object containing POST parameters. It is so named because POST parameters are passed in the body of the REQUEST, not in the URL like querystring parameters. To make req.body available, you’ll need middleware that can parse the body content.
4. req.cookies/req.signedCookies => req.cookies is an object containing the cookies sent by the client. req.signedCookies is an object
5. req.headers => The request headers received from the client.
6. req.ip => the ip address of the client
7. req.accepts([types]) => A convenience method to determine whether the client accepts a given type or types (optional types can be a single MIME type, such as application/json, a commadelimited list, or an array). This method is of primary interest to those writing public

## The response object

The response object (which is normally passed to a callback, meaning you can name it whatever you want: it is common to name it res, resp, or response) starts its life as an instance of http.ServerResponse, a core Node object. Express adds additional functionality. Let’s look at the most useful properties and methods of the response object (all of these are added by Express):

1. res.status(code) => Sets the HTTP status code. Express defaults to 200 (OK), so you will have to use this method to return a status of 404 (Not Found) or 500 (Server Error), or any other status code you wish to use. For redirects (status codes 301, 302, 303, and 307), there is a method redirect, which is preferable.
2. res.set(name, value) => Sets a response header. This is not something you will normally be doing manually.
3. res.cookie(name, value, [options]) => Sets cookies that will be stored on the client.
4. res.clearCookie(name, [options]) => clears cookies that will be stored on the client.
5. res.redirect([status], url) => Redirects the browser. The default redirect code is 302 (Found). In general, you should minimize redirection unless you are permanently moving a page, in which case you should use the code 301 (Moved Permanently).
6. res.send(body), res.send(status, body) => Sends a response to the client, with an optional status code. Express defaults to a content type of text/html, so if you want to change it to text/plain (for example), you’ll have to call res.set('Content-Type', 'text/plain\') before calling res.send. If body is an object or an array, the response is sent as JSON instead (with the content type being set appropriately), though if you want to send JSON, I recommend doing so explicitly by calling res.json instead.
7. res.json(json), res.json(status, json) Sends JSON to the client with an optional status code.

## Middleware

Middleware is anything that is between the request and response

examples:
In the below code one, two and three are middlewares.
They will always be executed after the ./chain get request and before the response.

```javascript
const one = (request, response, next) => {
  console.log("one");
  next();
};
const two = (request, response, next) => {
  console.log("two");
  next();
};
const three = (request, response, next) => {
  console.log("three");
  next();
};

app.get("/chain", one, two, three, (request, response) => {
  response.send("done - chain route");
});
```

## Mongodb local url

MONGO_LOCAL=mongodb://localhost:27017/new_users
