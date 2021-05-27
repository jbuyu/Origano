let BASE_URL;
if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:4000/api/products";
} else {
  BASE_URL = "https://protomania.herokuapp.com/api/products";
}

export default BASE_URL;
