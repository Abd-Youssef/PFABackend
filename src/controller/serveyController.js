const { Servey } = require("../model/servey");
const { spawn } = require("child_process");
const fetch = require('node-fetch');

function predict(data) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [
      "src/python/file.py",
      JSON.stringify(data),
    ]);
    let result = "";
    pythonProcess.stdout.on("data", function (data) {
      result += data.toString();
    });
    pythonProcess.stdout.on("end", function () {
      console.log("result1",result);
      
      try {
        const predictions = JSON.parse(result);
    console.log("predictions",predictions);

        resolve(predictions);
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
      
      
    });
    pythonProcess.on("error", function (err) {
      reject(err);
    });
  });
}
async function getResult(X) {
  const response = await fetch(process.env.Predection_URL + "predict", {
    method: "POST",
    body: JSON.stringify(X),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const result = await response.json();
  return Number(result.prediction);
}
async function createServey(req, res) {
  
  let {
    userid,
    sexe,
    age,
    cigarettes_per_day,
    blood_pressure_meds,
    stroke_prevalence,
    hypertension_prevalence,
    diabetes,
    cholesterol,
    systolic_blood_pressure,
    bmi, 
    heart_beat,
    glucose_levels,
    result
  } = req.body;
  try {
    let serveyDetails = new Servey({
      userid,
      sexe,
      age,
      cigarettes_per_day,
      blood_pressure_meds,
      stroke_prevalence,
      hypertension_prevalence,
      diabetes,
      cholesterol,
      systolic_blood_pressure,
      bmi,
      heart_beat,
      glucose_levels, 
      result: result,
      date: new Date(),
    });
    console.log("serveyDetails",serveyDetails);
    await serveyDetails.save(); 
    res
      .status(201)
      .json({ status: 201, message: "servey created", prediction: result });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
} 
 
function getServeyDetails(req, res) {
  return res.status(200).json({ status: 200, servey: req.servey });
}
async function getServeyForeachUser(req, res) { 
  try {
    if (req.params.userid) {
      const servey = await Servey.find({
        userid:req.params.userid,
    }); 
      if (servey) {
        return res.status(200).json({ status: 200, data: servey });
      }
      return res
        .status(404)
        .json({ status: 404, message: "servey not found ! " });
    }
    return res
      .status(400)
      .json({ status: 400, message: "user is required ! " });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}

async function deleteServey(req, res) {
  try {
    if (req.query.serveyid) {
      const servey = await Servey.findByIdAndDelete({
        _id: req.query.serveyid,
      });
      if (servey) {
        return res
          .status(200)
          .json({ status: 200, message: "servey deleted with succes " });
      }
      return res
        .status(404)
        .json({ status: 404, message: "servey not found ! " });
    }
    return res
      .status(400)
      .json({ status: 400, message: "servey is required ! " });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}
async function deleteAllServey(req, res) {
  try {
    if (req.query.userid) {
      const servey = await Servey.deleteMany({
        userid: req.query.userid,
      });
      if (servey) {
        return res
          .status(200)
          .json({ status: 200, message: "serveys deleted with succes " });
      }
      return res
        .status(404)
        .json({ status: 404, message: "serveys not found ! " });
    }
    return res
      .status(400)
      .json({ status: 400, message: "userid is required ! " });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}

exports.getServeyDetails = getServeyDetails;
exports.deleteServey = deleteServey;
exports.createServey = createServey;
exports.getServeyForeachUser = getServeyForeachUser;
exports.deleteAllServey = deleteAllServey;
