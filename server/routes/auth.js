const router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const pool = require("../db");
const { executionAsyncId } = require("async_hooks");

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "http:localhost:3000/dashboard",
    failureRedirect: "http:localhost:3000/auth/login",
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/signup", function (req, res, next) {
  res.json("OIHI");
});

router.post("/signup", async function (req, res, next) {
  const { username, email, password } = req.body;
  console.log(req.body);
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    password,
    salt,
    310000,
    32,
    "sha256",
    function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
        [username, email, hashedPassword],
        function (err) {
          if (err) {
            return next(err);
          }
          const user = {
            id: this.lastID,
            username: req.body.username,
          };
          req.login(user, function (err) {
            if (err) {
              return next(err);
            }
            res.redirect("http://localhost:3000/");
          });
        }
      );
    }
  );
});

// router.post("/signup", async (req, res) => {
//   const { username, password, email } = req.body;
//   console.log(req.body);
//   //check if the user exists
//   const exists = await pool.query("SELECT * FROM users WHERE email=$1", [
//     email,
//   ]);
//   if (exists.rows.length === 0) {
//     //user doesn't exist
//     const newUser = await pool.query(
//       "INSERT INTO users(username, email, password) VALUES($1, $2, $3)",
//       [username, email, password]
//     );
//     return res.json(newUser);
//   } else {
//     // user exists
//     return res.json(exists.rows[0]);
//   }
// });

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
      function (err, row) {
        if (err) {
          return cb(err);
        }
        if (!row) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }

        crypto.pbkdf2(
          password,
          row.salt,
          310000,
          32,
          "sha256",
          function (err, hashedPassword) {
            if (err) {
              return cb(err);
            }
            if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
              return cb(null, false, {
                message: "Incorrect username or password.",
              });
            }
            return cb(null, row);
          }
        );
      }
    );
  })
);

module.exports = router;
