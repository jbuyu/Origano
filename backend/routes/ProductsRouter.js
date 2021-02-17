const Router = require("express")();
const consola = require("consola");
const { products } = require("../data");

Router.get("/", (req, res) => {
  res.json({ products });
});
Router.get("/:id", (req, res) => {
  let productId = req.params.id;
  console.log(typeof productId);
  const product = products.find((product) => product._id === productId);
  res.json({ product });
});

module.exports = Router;
