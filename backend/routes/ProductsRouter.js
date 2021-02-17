const Router = require("express")();
const { products } = require("../data");

Router.get("/", (req, res) => {
  res.json({ products });
});

module.exports = Router;
