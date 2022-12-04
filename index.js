const express = require("express");
const app = express();
const cors = require("cors");
const registerRoutes = require("./routes/auth");
const passport = require("passport");
const passportSetup = require("./passport-config/passport-setup");
const cookieSession = require("cookie-session");
const localStorage = require("localStorage");
const dashboardRoutes = require("./routes/dashboard");
const submitRoutes = require("./routes/submit");
const methodOverride = require("method-override");

app.use(cors());
app.use(express.json());
app.use(methodOverride("_method"));

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
app.use("/dashboard", dashboardRoutes);
app.use("/submit", submitRoutes);

app.listen("5000", () => {
  console.log("ON PORT 5000");
});
