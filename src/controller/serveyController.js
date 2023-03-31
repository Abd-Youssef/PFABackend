const {Servey } = require("../model/servey");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");




function createServey(req,res){
    let serveyDetails = new Servey({
        user:req.body.user,
        sexe: req.body.sexe,
        age: req.body.age,
        cigarettes_per_day: req.body.cigarettes_per_day,
        blood_pressure_meds: req.body.blood_pressure_meds,
        stroke_prevalence: req.body.stroke_prevalence,
        hypertension_prevalence: req.body.hypertension_prevalence,
        education: req.body.education,
        diabetes: req.body.diabetes,
        systolic_blood_pressure: req.body.systolic_blood_pressure,
        heart_beat: req.body.heart_beat,
        bmi: req.body.bmi,
        glucose_levels: req.body.glucose_levels,
      });

      serveyDetails
            .save()
            .then(() => {
              res.status(201).json({ status: 201, message: "servey created" });
            })
            .catch((error) => {
              res.status(400).json({ status: 400, message: error.message });
            });
}

function getServeyDetails(req, res) {
  return res.status(200).json({ status: 200, servey: req.servey });
}

async function getServeyForeachUser(req,res){
  try {
    if(req.query.userid){
      const servey= await Servey.find({ user: req.query.userid });
      if(servey){
        return res.status(200).json({status:200, servey:servey })
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

async function deleteServey(req, res) {
  try {
    if (req.query.serveyid) {
      const servey = await Servey.findByIdAndDelete({ _id: req.query.serveyid });
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

exports.getServeyDetails = getServeyDetails;
exports.deleteServey = deleteServey;
exports.createServey=createServey;
exports.getServeyForeachUser=getServeyForeachUser;
