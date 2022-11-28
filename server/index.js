const express = require("express");
const app = express();
const cors = require("cors");
const registerRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());

//Register and login Routes
app.use("/auth", registerRoutes);

app.listen("5000", () => {
  console.log("ON PORT 5000");
});
