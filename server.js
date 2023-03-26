require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
var http = require("http");
const { normalizePort } = require("./common");
var server = http.createServer(app);
const userRoutes = require("./src/routes/UserRoutes");
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");

var port = normalizePort(process.env.PORT || "8000");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connexion à MangoDB réussir !"))
  .catch((err) => {
    console.log("connexion à MangoDB échouée"), err.message;
  });

server.listen(port, () => {
  console.log("Server is running on port", port);
});

app.get("/", (req, res) => {
  res.send("Express server is up and running");
});

app.use("/", userRoutes);
