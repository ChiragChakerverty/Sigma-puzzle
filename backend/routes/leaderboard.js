var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.get("/", async function (req, res, next) {
  let users;
  let data=[];
  try {
    users = await User.find();
    for(let a=0;a<users.length;a++){
        if(users[a].level==6){
            const totalTime= users[a].game1[2]+users[a].game2[2]+users[a].game3[2]+users[a].game4[2]+users[a].game5[2];
            let dumm={
                rank:a,
                username: users[a].name,
                email: users[a].email,
                time: totalTime
            }
            data.push(dumm);
        }
    }
    data.sort((a, b) => {
        return a.time - b.time;
    });
    for(let a=0;a<data.length;a++){
        data[a].rank=a+1;
    }
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ data });
});

module.exports = router;