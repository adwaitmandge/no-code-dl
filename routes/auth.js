const express = require("express");
const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const { validInfo, validateEmail } = require("../middleware/validInfo");
const { application } = require("express");
const authorise = require("../middleware/authorisation");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

router.use(express.json());

router.post("/register", validInfo, async (req, res) => {
  try {
    //1. DESTRUCTURE THE REQ.BODY (username, email, password)
    const { username, password, email } = req.body;
    console.log(username, password, email);

    const newUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    // 2. CHECK IF THE USER EXISTS
    if (newUser.rows.length > 0) {
      console.log("HI!!");
      return res.status(401).send("User already exists");
    } else {
      //3. BCRYPT THE USER PASSWORD
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("hashed password", hashedPassword);
      //4. INSERT THE NEW USER INSIDE THE DATABASE
      console.log("Inserting into database");
      const newUser = await pool.query(
        "INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING *",
        [username, hashedPassword, email]
      );
      console.log("Inserted");
      //5. GENERATING OUR JWT TOKEN
      console.log(newUser);
      const token = jwtGenerator(newUser.rows[0].id);
      return res.json(token);
    }
  } catch (err) {
    console.error("SERVER ERROR");
    res.status(500).send(err.message);
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    //1. DESTRUCTURE FROM REQ.BODY
    console.log("Inside login");
    const { email, password } = req.body;
    console.log(email, password);
    const foundUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    //2. CHECK IF THE USER EXISTS
    if (foundUser.rows.length === 0) {
      //3. THROW ERROR IF THE USER DOES NOT EXIST
      return res.status(401).json("INVALID CREDENTIALS");
    } else {
      //4. CHECK IF THE PASSWORD ENTERED IS RIGHT
      const validPassword = await bcrypt.compare(
        password,
        foundUser.rows[0].password
      );
      //5. GENERATE A TOKEN IF THE PASSWORD ENTERED IS RIGHT
      if (validPassword) {
        const token = jwtGenerator(foundUser.rows[0].id);
        console.log("SUCCESS!!!");
        return res.json({ token });
      }
      throw new Error("INVALID CREDENTIALS");
    }
  } catch (err) {
    res.status(500).send("SERVER ERROR");
    console.error(err);
  }
});

//We have generated a jwt token and have sent it to the client side and so everytime they make a fetch or access request to get access to a private area they are going to have to show that token to us and now we need to create a middleware that will check whether or not the token that is given to us is valid

router.get("/is-verify", authorise, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});

//GOOGLE ROUTES

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  const token = jwtGenerator(req.user.id);
  res.cookie("token", token);
  res.redirect("http://localhost:3000/dashboard");
});

module.exports = router;