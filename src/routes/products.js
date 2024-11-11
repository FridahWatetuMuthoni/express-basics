const { Router } = require("express");
const { products } = require("../utils/data");

const productRouter = Router();

productRouter.get("/api/products", (request, response) => {
  //getting the cookiw from the request object
  console.log(request.cookies);
  if (request.cookies.homepage && request.cookies.homepage === "hello world") {
    return response.send(products);
  }
  return response
    .status(403)
    .send({ msg: "sorry, you require the correct cookie" });
});

module.exports = { productRouter };
