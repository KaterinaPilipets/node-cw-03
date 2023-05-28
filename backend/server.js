const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const dataBaseConnect = require("../config/dataBaseConnect");
require("colors");
const errorHandler = require("./midlewares/errorHandler");

const configPath = path.join(__dirname, "..", "config", ".env");
dotenv.config({ path: configPath });
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", require("./routes/filmsRoutes"));
app.use("*", (req, res, next) => {
  res.status(404);
  res.json({
    code: 404,
    message: "url route or page not found",
  });
});
app.use(errorHandler);
const { PORT } = process.env;

dataBaseConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.bold.italic);
});
