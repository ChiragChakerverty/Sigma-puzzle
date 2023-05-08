var express = require("express");
var router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/", async function (req, res, next) {
  const { email, complete, endtime } = req.body;
  console.log(email);
  const level = 4;

  User.findOne({ email: email })
    .then((docs) => {
      console.log("Result :", docs);
      let userData = docs.game3;
      if (complete == false) {
        userData[1] = userData[1] + 1;
        User.findOneAndUpdate(
          {email: email},
          { game3: userData },
          function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              console.log("Updated User : ", docs);
            }
          }
        );
      } else {
        userData[2] = endtime;
        userData[0] = 1;
        User.findOneAndUpdate(
          {email: email},
          { level: 4, game3: userData },
          function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              console.log("Updated User : ", docs);
            }
          }
        );        
      }
      return res.json(docs);
    })
    .catch((err) => {
      console.log(err);
    });

});

module.exports = router;
