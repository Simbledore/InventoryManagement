const express = require("express");
const cors = require("cors");
const datasource = require("./database/db_connection");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const articleRoutes = require("../Routes/article_routes");
const bookingRoutes = require("../Routes/booking_routes");

app.use("/api/article", articleRoutes);
app.use("/api/booking", bookingRoutes);

datasource.initialize().then(() => {
  console.log("Connected to database");

  app.listen(5000, () => console.log("Server started on port 5000"));
});
