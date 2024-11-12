const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { mockUsers } = require("../utils/data");

passport.serializeUser((user, done) => {
  console.log("inside serializer");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("inside deserializer");
  try {
    const findUser = mockUsers.find((user) => user.id === id);
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log(username, password);
    try {
      const findUser = mockUsers.find((user) => user.username === username);

      if (!findUser) {
        throw new Error("User not found");
      }
      if (findUser.password !== password) {
        throw new Error("Invalid Credentials");
      }

      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);

module.exports = passport;
