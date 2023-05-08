import React from "react";
import { Grid, Typography } from "@mui/material";
import RadialBar from "../Pages/Radial/RadialBar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import NoiseAwareIcon from "@mui/icons-material/NoiseAware";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import PsychologyIcon from "@mui/icons-material/Psychology";
// import { Doughnut } from 'react-chartjs-2';

const styles = {
  features: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #F9A826",
    borderRadius: "10px",
    boxShadow: "0 0 10px #fff",
    padding: "1rem",
  },

  text: {
    textAlign: "center",
    color: "rgba(156, 163, 175)",
    width: "80%",
  },
};

const score = (props) => {
  const email = props.email;
  //const data= props.data
  const [data, setData] = useState({
    email: email,
    rank: 0,
    time: 0,
    attempt: 0,
    mintime: 0,
    minattempt: 0,
    maxtime: 0,
    maxattempt: 4,
    avgtime: 0,
    avgattempt: 0,
    level: 0,
    game1: [0, 0, 0],
    game2: [0, 0, 0],
    game3: [0, 0, 0],
    game4: [0, 0, 0],
    game5: [0, 0, 0],
  });

  const getData = async () => {
    await axios
      .post("https://puzzle-backend-ymlo.onrender.com/api/game/scoreboard", {
        email: email,
      })
      .then((response) => {
        console.log(response);
        setData(response.data.allData);
      })
      .catch((error) => {
        console.log("Error");
      });
  };
  useEffect(() => {
    getData();
  }, data);
  console.log(data);

  const timedata = [
    Math.round((data.mintime / 1000 / 60) % 60),
    Math.round((data.time / 1000 / 60) % 60),
    Math.round((data.avgtime / 1000 / 60) % 60),
    Math.round((data.maxtime / 1000 / 60) % 60),
  ];
  const attemptdata = [
    data.minattempt,
    data.attempt,
    data.avgattempt,
    data.maxattempt,
  ];
  const label = ["Minimum time", "Your Time", "Average Time", "Maximum Time"];
  const label2 = [
    "Minimum Attempts",
    "Your Attempts",
    "Average Attempts",
    "Maximum Attempts",
  ];
  // const series=[100, 255, 41, 17, 15];
  const timedata2 = [2, 8, 38, 58];
  const attemptdata2 = [0, 4, 7, 14];
  let levelstr =
    "You are on Level" + data.level + " Complete Game to see your Rank";
  if (data.level == 6) {
    levelstr = " Leaderboard Rank is #" + data.rank;
  }
  console.log(levelstr);
  console.log(attemptdata);
  console.log(timedata);

  return (
    <div>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          minHeight: "100vh",
          backgroundColor: "#a6d0dd",
        }}
      >
        {/* -------------------------------------Heading----------------------------------- */}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: "bold",
              mt: "150px",
            }}
          >
            {levelstr}
          </Typography>
        </Grid>

        {/* -------------------------------------Score----------------------------------- */}

        <Grid
          item
          xs={12}
          sx={{
            p: "2rem",
            justifyContent: "center",
            alignItems: "center",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem",
          }}
        >
          {/* 1st item */}
          <Grid item sx={styles.features}>
            <h4>Increase Security</h4>
            <Typography variant="body1" sx={styles.text}>
              Time Taken
            </Typography>
            <RadialBar label={label} timedata={timedata2} />
          </Grid>

          <Grid item sx={styles.features}>
            <Typography variant="body1" sx={styles.text}>
              Attempts
            </Typography>
            <RadialBar label={label2} timedata={attemptdata2} />
          </Grid>
        </Grid>

        {/* -------------------------------Stats------------------------------------- */}

        {/* "allData": {
		"email": "gg@gmail.com",
		"rank": 4,
		"time": 541299,
		"attempt": 0,
		"mintime": 50,
		"minattempt": 0,
		"maxtime": 79080450,
		"maxattempt": 14,
		"avgtime": 13653304,
		"avgattempt": 4,
		"level": 6,
		"game1": [
			1,
			0,
			43715
		],
		"game2": [
			1,
			0,
			15754
		],
		"game3": [
			1,
			0,
			75090
		],
		"game4": [
			1,
			0,
			63459
		],
		"game5": [
			1,
			0,
			343281
		]
	} */}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: "bold",
              mt: "50px",
              mb: "50px",
            }}
          >
            Game Statistics
          </Typography>
        </Grid>

        <Grid
          item
          xs={10}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1.6rem",
            mb: "100px",
          }}
        >
          <Grid item sx={styles.features}>
            {/* <NoiseAwareIcon />           */}
            <Typography variant="body1" sx={styles.text}>
              <NoiseAwareIcon sx={{ height: "50px", width: "50px" }} />
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Simple Awareness Test
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              -----------------------------
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Your Time : {Math.round((data.game1[2] / 1000 / 60) % 60)} minutes
              {/* Your Time : 1 minutes */}
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Your Attempts : {data.game1[1]}
            </Typography>
          </Grid>

          <Grid item sx={styles.features}>
            <Typography variant="body1" sx={styles.text}>
              <LibraryBooksIcon sx={{ height: "50px", width: "50px" }} />
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Reading and Analysing Test
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              -----------------------------
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Your Time : {Math.round((data.game2[2] / 1000 / 60) % 60)} minutes
              {/* Your Time : 1 minutes */}
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Your Attempts : {data.game2[1]}
            </Typography>
          </Grid>
          <Grid item sx={styles.features}>
            <Typography variant="body1" sx={styles.text}>
              <VisibilityIcon sx={{ height: "50px", width: "50px" }} />
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Observation and Responsibility Test
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              -----------------------------
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Your Time : {Math.round((data.game3[2] / 1000 / 60) % 60)} minutes
              {/* Your Time : 1 minutes */}
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Your Attempts : {data.game3[1]}
            </Typography>
          </Grid>
          <Grid item sx={styles.features}>
            <Typography variant="body1" sx={styles.text}>
              <EmojiObjectsIcon sx={{ height: "50px", width: "50px" }} />
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Decision and Deducing Test
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              -----------------------------
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Your Time : {Math.round((data.game4[2] / 1000 / 60) % 60)} minutes
              {/* Your Time : 1 minutes */}
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Your Attempts : {data.game4[1]}
            </Typography>
          </Grid>

          <Grid item sx={styles.features}>
            <Typography variant="body1" sx={styles.text}>
              <PsychologyIcon sx={{ height: "50px", width: "50px" }} />
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Problem Solving and Riddle Test
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              -----------------------------
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Your Time : {Math.round((data.game5[2] / 1000 / 60) % 60)} minutes
              {/* Your Time : 1 minutes */}
            </Typography>
            <Typography variant="body1" sx={styles.text}>
              Your Attempts : {data.game5[1]}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default score;
