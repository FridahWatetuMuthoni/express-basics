const express = require("express");
const { router } = require("./routes/index");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./strategies/local-strategy");
const cors = require("cors");
const dotenv = require("dotenv");
const { mockUsers } = require("./utils/data");
const connectDB = require("./config/database");
const corsOptions = require("./config/corsOptions");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//middlewares
//cors => cross orign resource sharing
app.use(cors(corsOptions));

//for handling form data object
app.use(express.urlencoded({ extended: false }));

//for handling json data
app.use(express.json());

//for serving static files
app.use(express.static(path.join(__dirname, "/public")));

//cookies
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

//routes
app.use(router);

app.get("/", (request, response) => {
  const file_path = path.join(__dirname, "views/home.html");
  return response.sendFile(file_path);
});

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

app.post(
  "/api/users/login",
  passport.authenticate("local"),
  (request, response) => {
    response.status(200).send(request.user);
  }
);

app.post("/api/users/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);
  request.logout((err) => {
    if (err) {
      return response.sendStatus(400);
    } else {
      return response.sendStatus(200);
    }
  });
});

app.get("/api/users/status", (request, response) => {
  console.log(`Inside /auth/status endpoint`);
  console.log(request.user);
  return request.user ? response.send(request.user) : response.sendStatus(401);
});

app.listen(PORT, () => {
  console.log(`server is running on: http://localhost:3000`);
  connectDB();
});
