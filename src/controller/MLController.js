const { spawn } = require("child_process");

function predict(req, res) {
  const pythonProcess = spawn("python", ["src/python/file.py", JSON.stringify(req.body)]); 
  let result = "";
  pythonProcess.stdout.on("data", function (data) { 
    result += data.toString(); 
    console.log("result", result); 
  });
  pythonProcess.stdout.on("end", function () {
    const predictions = JSON.parse(result);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ status: 200, message: predictions });
  });
}
 
exports.predict = predict;
 