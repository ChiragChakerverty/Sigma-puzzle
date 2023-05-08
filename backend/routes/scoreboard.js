var express = require("express");
var router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/", async function (req, res, next) {
  const { email } = req.body;

  let users;
  let data=[];
  let allData;
  let count=0,avgtime=0,avgatt=0,mintime=1000000000,minatt=1000000000,time,attempt,rank, level;
  let level1,level2,level3,level4,level5;
  let maxtime=0,maxatt=0;
  try {
    users = await User.find();
    for (let a = 0; a < users.length; a++) {
      if(email==users[a].email){
        level=users[a].level;
        time =users[a].game1[2] +users[a].game2[2] +users[a].game3[2] +users[a].game4[2] +users[a].game5[2];
        attempt= users[a].game1[1] +users[a].game2[1] +users[a].game3[1] +users[a].game4[1] +users[a].game5[1];
        level1=users[a].game1;
        level2=users[a].game2;
        level3=users[a].game3;
        level4=users[a].game4;
        level5=users[a].game5;
      }
      if (users[a].level == 6) {
        const totalTime =users[a].game1[2] +users[a].game2[2] +users[a].game3[2] +users[a].game4[2] +users[a].game5[2];
        const totalAtt= users[a].game1[1] +users[a].game2[1] +users[a].game3[1] +users[a].game4[1] +users[a].game5[1];
        avgtime=avgtime+totalTime;
        avgatt=avgatt+totalAtt;
        count=count+1;
        if(totalAtt<minatt){
          minatt=totalAtt;
        }
        if(totalTime<mintime){
          mintime=totalTime;
        }
        if(totalAtt>maxatt){
          maxatt=totalAtt;
        }
        if(totalTime>maxtime){
          maxtime=totalTime;
        }
        let dumm = {
          rank: a,
          username: users[a].name,
          email: users[a].email,
          time: totalTime,
        };
        data.push(dumm);
      }
    }
    avgatt=Math.ceil(avgatt/count);
    avgtime=Math.ceil(avgtime/count);
    data.sort((a, b) => {
      return a.time - b.time;
    });
    for (let a = 0; a < data.length; a++) {
      data[a].rank = a + 1;
      if(data[a].email==email){
        rank=a+1; 
        break;
      }
    }
    allData={
      email: email,
      rank: rank,
      time: time,
      attempt: attempt,
      mintime: mintime,
      minattempt: minatt,
      maxtime: maxtime,
      maxattempt: maxatt,
      avgtime: avgtime,
      avgattempt: avgatt,
      level: level,
      game1: level1,
      game2: level2,
      game3: level3,
      game4: level4,
      game5: level5
    }
    return res.status(200).json({ allData });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "No Users Found" });
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
});

module.exports = router;
