const whitelist = ["http://127.0.0.1:5173", "http://127.0.0.1:5000"];
const corsOptions = {
  origin: (origin, callback) => {
    //remove !origin on production
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
