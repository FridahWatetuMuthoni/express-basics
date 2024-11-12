const { Router, request } = require("express");
const {
  createUserValidationSchema,
  createUserFilterValidation,
} = require("../utils/validationSchemas");
const { users, mockUsers } = require("../utils/data");
const {
  validationResult,
  matchedData,
  checkSchema,
} = require("express-validator");
const { User } = require("../schema/user");
const { hashPassword } = require("../utils/helpers");

const userRouter = Router();

userRouter.get("/api/users", (req, res) => {
  /*
Query params: 
http:127.0.0.1/products?key=10fjjh&key2=ghdshgy
http:127.0.0.1/users?username=watetu&password=mypassword
*/
  // console.log(`from request object: ${req.session.id}`);
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }
    // console.log(`from sessionStore:${sessionData}`);
  });
  const result = validationResult(req);
  // console.log(result);
  const {
    query: { filter, value },
  } = req;
  if (filter && value) {
    const filtered_users = mockUsers.filter((user) =>
      user[filter].startsWith(value)
    );
    // const filtered_users = mockUsers.filter((user) =>
    //   user[filter].includes(value)
    // );
    res.send(filtered_users);
  } else {
    res.send(mockUsers);
  }
});

userRouter.get("/api/users/:id", (req, res) => {
  const parsed_id = parseInt(req.params.id);

  if (isNaN(parsed_id)) {
    return res.status(400).send({ msg: "Bad Request. Invalid id" });
  } else {
    const user = users.find((user) => user.id === parsed_id);
    if (user) {
      res.send(user);
    } else {
      res.send(`user with id of ${req.params.id} not found`);
    }
  }
});

/*================== POST REQUESTS ==================*/

userRouter.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // Return validation errors if any
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);
    const { username, email, password } = data;
    const hashed_password = hashPassword(password);

    const new_user = {
      username,
      email,
      password: hashed_password,
    };

    try {
      const newUser = new User(new_user);
      const savedUser = await newUser.save();

      return res.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }
);

/*================== PUT REQUESTS ==================*/
/*
put requests are used to update every field of eg a user.
even though you only want to update the username, you have to include all the
other fields when doing a put request
*/

userRouter.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsed_id = parseInt(id);

  if (isNaN(parsed_id)) {
    return res.status(400).send({ msg: "Bad Request. Invalid id" });
  } else {
    const user = users.find((user) => user.id === parsed_id);
    if (user) {
      users[parsed_id] = { id: parsed_id, ...body };
    } else {
      res.sendStatus(404);
    }
  }
});

/*================== PATCH REQUESTS ==================*/
/*
patch requests are used to update data partially.
incase of a user, you can use a patch request to update only the the username
and nothing else.
*/

userRouter.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsed_id = parseInt(id);

  if (isNaN(parsed_id)) {
    return res.status(400).send({ msg: "Bad Request. Invalid id" });
  } else {
    const user = users.find((user) => user.id === parsed_id);
    if (user) {
      users[parsed_id] = { id: parsed_id, ...body };
    } else {
      res.sendStatus(404);
    }
  }
});

/*================== DELETE REQUESTS ==================*/
userRouter.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsed_id = parseInt(id);

  if (isNaN(parsed_id)) {
    return res.status(400).send({ msg: "Bad Request. Invalid id" });
  } else {
    const user = users.find((user) => user.id === parsed_id);
    const users = user.filter((user) => user.id === parsed_id);
    if (user) {
      res.send(user).sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

module.exports = { userRouter };
