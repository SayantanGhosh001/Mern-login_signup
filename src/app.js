require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
require("./db/conn");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const Register = require("./models/registers");
const port = process.env.PORT || 7000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const passwordHash = await bcrypt.hash(password, 10);
      const cpasswordHash = await bcrypt.hash(cpassword, 10);
      const registerstudent = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phoneNo,
        password: passwordHash,
        confirmpassword: cpasswordHash,
      });

      const registered = await registerstudent.save();
      res.status(201).render("index");
    } else {
      res.send("password not matching");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// console.log(process.env.SECRET_KEY);
app.get("/login", (req, res) => {
  res.render("login");
});

//login check
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // console.log(`${email}and ${password}`)

    const useremail = await Register.findOne({ email: email });
    // res.send(useremail)
    // console.log(useremail.password);
    const isMatch = await bcrypt.compare(password, useremail.password);

    if (isMatch) {
      res.status(201).render("index");
    } else {
      res.send("invalid Login details");
    }
  } catch (e) {
    res.status(400).send("invalid Login details");
  }
});

app.listen(port, () => {
  console.log(`Listening on the port no ${port}`);
});
