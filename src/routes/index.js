const { Router } = require("express");
const { userRouter } = require("./users");
const { productRouter } = require("./products");

const router = Router();

router.use(userRouter);
router.use(productRouter);

module.exports = { router };
