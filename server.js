require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
var http = require("http");
const { normalizePort } = require("./common");
var server = http.createServer(app);
const userRoutes = require("./src/routes/UserRoutes");
const serveyRoutes = require("./src/routes/ServeyRoutes");
const MLRoutes = require("./src/routes/MLRoutes");
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


app.get('/', (req, res) => {

  const { spawn } = require('child_process');
  X = [[1,33,4.0,0.0,0.0,0.0,0,0.0,165,136.0,24.95,88,290]]
  const pythonProcess = spawn("python", ["src/python/file.py",JSON.stringify(X)]);


  pythonProcess.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
  });
})


app.use("/", userRoutes);
app.use("/servey", serveyRoutes);
app.use("/predict", MLRoutes);


// let runPy = new Promise(function(success, nosuccess) {
//   const { spawn } = require('child_process');
//   const pyprog = spawn('python', ['src/python/file.py']);

//   pyprog.stdout.on('data', function(data) {
//     success(data);
//   });

//   pyprog.stderr.on('data', (data) => {
//     nosuccess(data);
//   });

//   pyprog.on('error', (err) => { // add this error handler
//     nosuccess(err);
//   });
// })
// .catch((err) => {
//   console.error(err); // handle the rejection error here
// });


// app.get('/', (req, res) => {

//   res.write('welcome\n'); 

//   runPy.then(function(fromRunpy) {
//       console.log(fromRunpy.toString()); 
//       res.end(fromRunpy);
//   });
// })