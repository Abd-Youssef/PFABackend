const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { Doctor } = require("../model/doctor");

function addDoctor(req, res) {
  const { name, speciality, address, phoneNumber } = req.body;

  Doctor.findOne({
    name: req.body.name,
    PhoneNumber: req.body.PhoneNumber,
  })
    .then((doctor) => {
      if (doctor) {
        res.status(409).json({ status: 409, message: "Doctor Already exist" });
      } else {
        if (name && speciality && address && phoneNumber) {
          if (phoneNumber.toString().length === 8) {
            let doctorDetails = new Doctor({
              name,
              speciality,
              address,
              phoneNumber,
            });
            doctorDetails
              .save()
              .then(() => {
                res.status(201).json({ status: 201, message: "doctor added" });
              })
              .catch((error) => {
                res.status(400).json({ status: 400, message: error });
              });
          } else {
            res.status(400).json({
              status: 400,
              message: "Phone Number must compose of 8 numbers",
            });
          }
        } else {
          res
            .status(400)
            .json({ status: 400, message: "Fill in all the field" });
        }
      }
    })
    .catch((error) =>
      res.status(500).json({ status: 500, message: error.message })
    );
}

async function geAllDoctors(req, res) {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ status: 200, data: doctors });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
}

async function deleteDoctor(req, res) {
  try {
    if (req.params.doctorid) {
      const doctor = await Doctor.findByIdAndDelete({
        _id: req.params.doctorid,
      });
      if (doctor) {
        return res
          .status(200)
          .json({ status: 200, message: "doctor deleted with succes " });
      }
      return res
        .status(404)
        .json({ status: 404, message: "doctor not found ! " });
    }
    return res
      .status(400)
      .json({ status: 400, message: "doctor is required ! " });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}
async function getAllspecialities(req, res, next) {
  try {
    const doctors = await Doctor.find();
    specialities = [];
    doctors.map((val, key) => {
      if (!specialities.includes(val.speciality.toUpperCase())) {
        specialities.push(val.speciality.toUpperCase());
      }
    });
    res.status(200).json({ status: 200, data: specialities });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
}
function updateDoctor(req, res, next) {
  const { name, speciality, address, phoneNumber } = req.body;
  if (name && speciality && address && phoneNumber) {
    if (phoneNumber.toString().length === 8) {
      Doctor.findByIdAndUpdate(
        { _id: req.params.doctorid },
        {
          name: name,
          speciality: speciality,
          address: address,
          phoneNumber: phoneNumber,
        }
      )
        .then((doctor) => {
          if (!doctor) {
            // if no doctor found with the specified ID
            return res
              .status(404)
              .json({ status: 404, message: "Doctor not found" });
          }
          return res
            .status(200)
            .json({ status: 200, message: "Doctor updated", data: doctor });
        })
        .catch((error) => {
          return res.status(404).json({ status: 404, message: error.message });
        });
    } else {
      res.status(400).json({
        status: 400,
        message: "Phone Number must compose of 8 numbers",
      });
    }
  } else {
    res.status(400).json({ status: 400, message: "Fill in all the field" });
  }
}
exports.addDoctor = addDoctor;
exports.geAllDoctors = geAllDoctors;
exports.deleteDoctor = deleteDoctor;
exports.getAllspecialities = getAllspecialities;
exports.updateDoctor = updateDoctor;
