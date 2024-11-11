const express = require("express");
const { router } = require("./routes/index");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { mockUsers } = require("./utils/data");

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "fridah the developer",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
  })
);
app.use(router);

const PORT = process.env.PORT || 3000;

/*================== GET REQUESTS ==================*/

//using a middleware for a specific root
app.get("/", (req, res) => {
  // console.log(req.session.id);
  req.session.visited = true;
  //adding a cookie to a response
  //you set the cookies in the route that you must visit first
  const twelve_hours = 60000 * 60 * 12;
  res.cookie("homepage", "hello world", { maxAge: twelve_hours });
  const data = {
    msg: "hello world",
  };
  res.send(data);
});

app.post("/api/auth", (request, response) => {
  const {
    body: { username, password },
  } = request;
  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password) {
    return response.status(401).send({ err: "BAD CREDENTIALS" });
  }
  request.session.user = findUser;
});

app.listen(PORT, () => {
  console.log(`server is running on: http://localhost:3000`);
});
