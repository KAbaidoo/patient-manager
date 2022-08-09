let mongoose = require("mongoose");

//  Patients
let patientsSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  payments: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Patients", patientsSchema);
