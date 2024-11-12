const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../schema/user");
const { comparePassword } = require("../utils/helpers");

passport.serializeUser((user, done) => {
  console.log("inside serializer");
  console.log(user);
  done(null, user._id.toString());
});

passport.deserializeUser(async (_id, done) => {
  console.log("inside deserializer");
  try {
    const findUser = await User.findById(_id);
    if (!findUser) {
      throw new Error("User was not found");
    }
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username: username });
      if (!findUser) throw new Error("User was not found");
      const compare = comparePassword(password, findUser.password);

      if (!compare) throw new Error("Invalid Credentials");

      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);

module.exports = passport;
