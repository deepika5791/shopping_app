require("dotenv").config();
const app = require("./app");
const mongodb = require("./src/config/db");

const port = process.env.PORT;

mongodb().then(() => {
  app.listen(port, () => {
    console.log(` Server is running on port ${port}`);
  });
});
