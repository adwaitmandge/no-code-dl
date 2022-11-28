const express = require("express");
const authRoutes = require("./routes/auth");
const app = express();
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  return next();
});

const sessionConfig = {
  store: new pgSession({
    pool: pool,
    tableName: "session",
  }),
  name: "SID",
  secret: process.env["SECRET"],
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    aameSite: true,
    secure: false, // ENABLE ONLY ON HTTPS
  },
};

app.use("/auth", authRoutes);
app.use(session(sessionConfig));
app.use(cors());

app.use(passport.authenticate("session"));

app.listen("5000", () => {
  console.log("ON PORT 5000");
});
