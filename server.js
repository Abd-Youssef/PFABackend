require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
var http = require("http");
const { normalizePort } = require("./common");
var server = http.createServer(app);
const doctorRoutes = require("./src/routes/DoctorRoutes")
const statRoutes = require("./src/routes/StatRoutes");
const serveyRoutes = require("./src/routes/ServeyRoutes");
const MLRoutes = require("./src/routes/MLRoutes");
const userRoutes = require("./src/routes/UserRoutes.Js")
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
const { kMaxLength } = require("buffer");

var port = normalizePort(process.env.PORT || "8000");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(() => console.log("connexion à MongoDB réussir !"))
  .catch((err) => {
    console.log("connexion à MongoDB échouée"), err.message;
  });

server.listen(port, () => {
  console.log("Server is running on port", port);
});


// app.get('/', (req, res) => {

//   const { spawn } = require('child_process');
//   X = [[1,33,4.0,0.0,0.0,0.0,0,0.0,165,136.0,24.95,88,290]]
//   const pythonProcess = spawn("python", ["src/python/file.py",JSON.stringify(X)]);


//   pythonProcess.stdout.on('data', function(data) {

//       console.log(data.toString());
//       res.write(data);
//       res.end('end');
//   });
// })

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", userRoutes);
app.use("/servey", serveyRoutes);
app.use("/predict", MLRoutes);
app.use("/doctor", doctorRoutes);
app.use("/stat", statRoutes);

