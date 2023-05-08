var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.get("/", async function (req, res, next) {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
});

module.exports = router;