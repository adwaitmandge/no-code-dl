const express = require("express");
const app = express();
const cors = require("cors");
const registerRoutes = require("./routes/auth");
const passport = require("passport");
const passportSetup = require("./passport-config/passport-setup");
const cookieSession = require("cookie-session");
const localStorage = require("localStorage");

app.use(cors());
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 24 * 3600 * 1000,
    keys: [process.env.encryptionKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Register and login Routes
app.use("/auth", registerRoutes);

app.listen("5000", () => {
  console.log("ON PORT 5000");
});
