const mongoose = require("mongoose");

const serveySchema = mongoose.Schema(
  {
    userid:{
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
    // education: {
    //     type: Number,
    //     required: true,
    // },
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
    diabetes: {
        type: Number,
        required: true,
    },
    cholesterol: {
        type: Number,
        required: true,
        // default :110,
    },
    systolic_blood_pressure: {
        type: Number,
        required: true,
        // default :110,
    },
    bmi:{
        type: Number,
        required : true ,
    },
    heart_beat:{
        type: Number,
        required : true ,
        // default : 60,
    },
    glucose_levels:{
        type: Number,
        required : true ,
        // default : 110,
    },
    result:{
        type: Number,
        required : true ,
    },
    date: {
        type: Date,
        required: false,
      },
  },
);
module.exports.Servey = mongoose.model("servey", serveySchema);
