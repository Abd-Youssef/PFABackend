const mongoose = require("mongoose");

const serveySchema = mongoose.Schema(
  {
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
        // require: true
    },
    sexe: {
        type: Number,
        required: true,
    },
    age : {
        type: Number,
        required: true,
    },
    cigarettes_per_day: {
        type: Number,
        required : true ,
        default : 0,
    },
    blood_pressure_meds: {
        type: Number,
        required: true,
    },
    stroke_prevalence:{
        type: Number,
        required : true ,
        // default : "guest",
    },
    hypertension_prevalence: {
        type: Number,
        required: true,
      },
    education: {
        type: Number,
        required: true,
    },
    diabetes: {
        type: Number,
        required: true,
    },
    systolic_blood_pressure: {
        type: Number,
        required: true,
        // default :110,
    },
    heart_beat:{
        type: Number,
        required : true ,
        // default : 60,
    },
    bmi:{
        type: Number,
        required : true ,
    },
    glucose_levels:{
        type: Number,
        required : true ,
        // default : 110,
    }
  },
);
module.exports.Servey = mongoose.model("servey", serveySchema);
