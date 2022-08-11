const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

//create express app
const app = express();
const port = 4000;

mongoose.connect("mongodb://localhost:27017/health-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

// check connection
db.once("open", () => {
  console.log("connected to MongoDB");
});
// check db error
db.on("error", (err) => {
  console.log(err);
});

// bring in models
const Patients = require("./models/patients");
const Users = require("./models/users");

const doc = new Users({
  fname: "kobby",
  lname: "Norman",
  email: "kobbykolmes@gmail.com",
  password: "chase2000",
});
doc.save().then((savedDoc) => {
  if (savedDoc === doc) {
    console.log("Document saved");
  } else {
    console.log("Error saving document!");
  }
});

// Load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set public folder
app.use(express.static(path.join(__dirname, "public")));

// Body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// global variable
app.use((req, res, next) => {
  res.locals.errors = null;
  next();
});
app.use((req, res, next) => {
  res.locals.message = {};
  next();
});

// sign in
app.get("/", (req, res) => {
  res.render("signin", { title: "Sign in page" });
});

app.post("/signin", (req, res) => {
  const data = {
    email: String.toString(req.body.email),
    password: String.toString(req.body.password),
    };
    
  (async () => {
    await Users.findOne(data, (err, results) => {
      if (err) {
        res.render("signin", {
          title: "Sign in page",
          message: { msg: "Wrong login credentials", class: "alert-danger" },
        });
        console.log(err);
      } else {
        res.render("index", {
          title: "Home",
          message: { msg: "Login successful!", class: "alert-success" },
        });
      }
    });
  })();
});

// Add user
// Add Route
app.get("/signup", (req, res) => {
  res.render("add_user", { title: "New user registration", message: {} });
});

// Add Submit POST Route
app.post(
  "/signup",
  [
    check("fname", "First name cannot be empty").notEmpty(),
    check("lname", "Last name cannot be empty").notEmpty(),
    check("email", "Add Email").isEmail(),
    check("password", "Choose a password").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add_user", {
        title: "Add user",
        errors: errors.array(),
        message: {},
      });
    } else {
      let user = new Users();
      user.fname = req.body.fname;
      user.lname = req.body.lname;
      user.email = req.body.email;
      user.password = req.body.password;

      user.save((err) => {
        if (err) {
          console.log(err);
          // return;
        } else {
          res.render("signin", {
            title: "Sign in page",
            message: {
              msg: "User saved successfully, You may now Login ",
              class: "alert-success",
            },
          });
        }
      });
    }
  }
);

// Add Route
app.get("/patients/add", (req, res) => {
  res.render("add_patient", { title: "Add Patient", message: [] });
});

// Add Submit POST Route
app.post(
  "/patients/add",
  [
    check("fname", "First name cannot be empty").notEmpty(),
    check("lname", "Last name cannot be empty").notEmpty(),
    check("gender", "Select a gender").notEmpty(),
    check("birthdate", "Select birthdate").notEmpty(),
    check("address", "Enter address").notEmpty(),
    check("phone", "provide phone number").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add_patient", {
        title: "Add Patient",
        errors: errors.array(),
        message: {},
      });
    } else {
      let patient = new Patients();

      patient.fname = req.body.fname;
      patient.lname = req.body.lname;
      patient.gender = req.body.gender;
      patient.birthdate = req.body.birthdate;
      patient.address = req.body.address;
      patient.phone = req.body.phone;

      patient.save((err) => {
        if (err) {
          console.log(err);
          // return;
        } else {
          res.redirect("/patients");
        }
      });
    }
  }
);
// Get patients
app.get("/patients", (req, res) => {
  Patients.find({}, (err, patients) => {
    if (err) {
      console.log(err);
    } else {
      res.render("patients", {
        title: "Manage patients",
        patients: patients,
        message: {},
      });
    }
  });
});
// Get single patient
app.get("/patients/:id", (req, res) => {
  Patients.findById(req.params.id, (err, patient) => {
    if (err) {
      console.log(err);
    } else {
      res.render("patient_details", {
        patient: patient,
        title: "Patient info",
        message: [],
      });
    }
  });
});

// Edit Patient
app.get("/patients/edit/:id", (req, res) => {
  Patients.findById(req.params.id, (err, patient) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit_patient", {
        patient: patient,
        title: "Edit patient info",
        message: {},
      });
    }
  });
});
// Edith patient
app.post("/patients/edit/:id", (req, res) => {
  let patient = {};

  patient.fname = req.body.fname;
  patient.lname = req.body.lname;
  patient.gender = req.body.gender;
  patient.bithdate = req.body.birthdate;
  patient.address = req.body.address;
  patient.phone = req.body.phone;

  let query = { _id: req.params.id };
  Patients.updateOne(query, patient, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/patients/" + req.params.id);
    }
  });
});

app.get("/patients/delete/:id", (req, res) => {
  let query = { _id: req.params.id };

  Patients.findByIdAndDelete(query, (err) => {
    if (err) {
      console.log(err);
      // return;
    } else {
      res.redirect("/patients");
    }
  });
});

// payments
app.get("/patients/payments/:id", (req, res) => {
  Patients.findById(req.params.id, (err, patient) => {
    if (err) {
      console.log(err);
    } else {
      res.render("payments", {
        title: "Payments",
        patient: patient,
        message: {},
      });
    }
  });
});

app.post("/patients/payments/:id", (req, res) => {
  let query = { _id: req.params.id };
  Patients.findById(query, (err, patient) => {
    if (err) {
      console.log(err);
    } else {
      let payment = {
        payments: parseFloat(patient.payments) + parseFloat(req.body.amt),
      };
      Patients.findByIdAndUpdate(query, payment, { new: true }, (err) => {
        if (err) {
          console.log(err);
          // return;
        } else {
          res.redirect("/patients/" + req.params.id);
        }
      });
    }
  });
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
