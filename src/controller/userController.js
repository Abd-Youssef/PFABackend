const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

function login(req, res) {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user ) {
        res.status(404).json({ status: 404, message: "User not found" });
      } else {
        bcrypt.compare(req.body.password, user.password).then((valid) => {
          if (!valid) {
            res.status(401).json({ status: 401, message: "wrong password" });
          } else {
            let token = jwt.sign({ userid: user._id }, process.env.SECRET_KEY, {
              expiresIn: "1440h",
            });
            User.updateOne(
              { email: req.body.email },
              {
                $set: {
                  token: token,
                },
              }
            )
              .then(() => {
                res.status(200).json({
                  status: 200,
                  message: "login with success",
                  data: user,
                  token:token,
                });
              })
              .catch((error) =>
                res.status(400).json({ status: 400, message: error.message })
              );
          }
        });
      }
    })
    .catch((error) =>
      res.status(500).json({ status: 500, message: error.message })
    );
}
function signup(req, res) {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      res.status(409).json({ status: 409, message: "User Already exist" });
    } else {
      let RandomNumber = Math.floor(1000 + Math.random() * 9000);
      var password = req.body.password;
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          let userDetails = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hash,
            email: req.body.email,
            verification_code: RandomNumber,
          });
          userDetails
            .save()
            .then(() => {
              res.status(201).json({ status: 201, message: "user created" });
            })
            .catch((error) => {
              res.status(400).json({ status: 400, message: error.message });
            });
        })
        .catch((error) =>
          res.status(500).json({ status: 500, message: error.message })
        );
    }
  });
}

function getUserDetails(req, res) {
  return res.status(200).json({ status: 200, user: req.user });
}

async function deleteUser(req, res) {
  try {
    if (req.query.userid) {
      const user = await User.findByIdAndDelete({ _id: req.query.userid });
      if (user) {
        return res
          .status(200)
          .json({ status: 200, message: "User deleted with succes " });
      }
      return res
        .status(404)
        .json({ status: 404, message: "User not found ! " });
    }
    return res
      .status(400)
      .json({ status: 400, message: "User is required ! " });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}

exports.getUserDetails = getUserDetails;
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
