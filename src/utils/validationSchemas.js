const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "username must be at least 5 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "username should not be empty",
    },
    isString: {
      errorMessage: "username should be a string",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "email should not be empty",
    },
    isEmail: {
      errorMessage: "email must be a valid email address",
    },
  },
};

const createUserFilterValidation = {
  filter: {
    notEmpty: {
      errorMessage: "filter must not be empty",
    },
    isString: {
      errorMessage: "filter must be a string",
    },
  },
};

module.exports = { createUserValidationSchema, createUserFilterValidation };
