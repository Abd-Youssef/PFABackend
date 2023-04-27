const mongoose = require("mongoose");

const statSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    period: {
      type: String,
      enum: ['day','week','month', 'year','allTime'],
      required: true,
    },
    connections: {
      type: [Number],
      default: [0],
    },
    accountsCreated: {
      type: [Number],
      default: [0],
    },
    surveysPos: {
      type: [Number],
      default: [0],
    },
    surveysNega: {
      type: [Number],
      default: [0],
    },
  },
);


module.exports.Stat = mongoose.model("Stat", statSchema);
