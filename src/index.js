const express = require("express");
const { router } = require("./routes/index");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./strategies/local-strategy");
const { mockUsers } = require("./utils/data");
const { mongoose } = require("mongoose");
const app = express();

//middlewares
app.use(express.json());
mongoose
  .connect("mongodb://localhost/express_tutorial")
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => console.log(err));

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
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

const PORT = process.env.PORT || 3000;

/*================== GET REQUESTS ==================*/

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

app.post("/api/auth", passport.authenticate("local"), (request, response) => {
  response.sendStatus(200);
});

app.post("/api/auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);
  request.logout((err) => {
    if (err) {
      return response.sendStatus(400);
    } else {
      return response.sendStatus(200);
    }
  });
});

app.get("/api/auth/status", (request, response) => {
  console.log(`Inside /auth/status endpoint`);
  console.log(request.user);
  return request.user ? response.send(request.user) : response.sendStatus(401);
});

app.listen(PORT, () => {
  console.log(`server is running on: http://localhost:3000`);
});
