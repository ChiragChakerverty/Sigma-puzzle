import { Button, Grid, Typography, Modal, Box, TextField } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import getCookie from "../hooks/getCookie";
import setCookie from "../hooks/setCookie";
import removeCookie from "../hooks/removeCookie";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../Components/Assets/level1.json";
import { useState, useEffect, useRef } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const textfield = {
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
  },
  m: 1,
};

const buttons = { margin: "8px", backgroundColor: "#1D3557" };
const text = { padding: 2, margin: "3px 0" };

var modalText = "Wrong answer !! You sure you are on the right Page";

const Homepage = () => {
  const navigate = useNavigate();
  const form = useRef();

  ////////////// Time Function
  const d = new Date();
  let time = d.getTime();
  let level2time = getCookie("level5");
  if (!level2time) {
    let cookieState = {
      startTime: time,
      endTime: 0,
    };
    setCookie("level5", JSON.stringify(cookieState));
  }

  const [open, setOpen] = useState(false);
  const [lastpage, setLastpage] = useState("/level5");
  const [message, setMessage] = useState("Retry");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigation = () => {
    if (lastpage === "/level5") {
      window.location.reload();
    } else {
      const email = JSON.parse(getCookie("login")).email;
      navigate("/scoreboard", {
        state: {
          email: email,
        },
      });
    }
  };

  const checkComplete = (e) => {
    e.preventDefault();
    let login = getCookie("login");
    let answer = form.current.answer.value;
    answer = answer.toLowerCase();

    if (login) {
      let loginp = JSON.parse(login);
      /// calculate time
      const d = new Date();
      let time = d.getTime();
      let getstarttime = getCookie("level5");
      let getstarttimep = JSON.parse(getstarttime);
      let totalTime = time - getstarttimep.startTime;
      if (answer == "elitmus") {
        removeCookie("level5");
        let cookieStatetime = {
          startTime: getstarttimep.startTime,
          endTime: time,
        };
        setCookie("level5", JSON.stringify(cookieStatetime));
        console.log(totalTime);
        ///////
        const cookieState = {
          email: loginp.email,
          password: loginp.password,
          username: loginp.username,
          level: 6,
        };
        removeCookie("login");
        setCookie("login", JSON.stringify(cookieState));
        axios
          .post("https://puzzle-backend-ymlo.onrender.com/api/game/level5", {
            email: loginp.email,
            complete: true,
            endtime: totalTime,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log("Error");
          });
        console.log("Success");
        modalText =
          "Congratulations!! You Completed Test, and are a SIGMA officially. Proceed to know your Score and don't forget to check LeaderBoard too.";
        setMessage("Proceed");
        setLastpage("/scoreboard");
      } else {
        axios
          .post("https://puzzle-backend-ymlo.onrender.com/api/game/level5", {
            email: loginp.email,
            complete: false,
            endtime: 0,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log("Error");
          });
        console.log("Try Again");
        modalText = "Wrong answer !!";
        setMessage("Try Again");
      }
      handleOpen();
    } else {
      modalText = "Login to Play";
      setMessage("Retry");
      console.log("Retry");
      window.location.reload();
      handleOpen();
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Navbar />
      <Grid
        container
        xs={12}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#a6d0dd",
        }}
      >
        <Grid
          item
          sx={{
            p: 5,
            borderRadius: "20px",
            border: "2px solid #b04759",
            marginTop: "50px",
          }}
        >
          {/* <Lottie options={defaultOptions} height={350} width={800} /> */}
          <Grid
            item
            sx={{
              height: 350,
              width: 600,
              marginLeft: "350px",
            }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/karya-55d30.appspot.com/o/img.jpg?alt=media&token=f41a5aed-0507-4da6-9072-1525c3b51bb1"
              alt="image"
              height={350}
              width={600}
            />
          </Grid>
          <Typography
            sx={{
              fontSize: "2rem",
              color: "#b04759",
            }}
          >
            {" "}
            There's a well known paper which is used to distinguish between acid
            and bases. If that paper is available on an electronic media, then
            what it will be called ?
          </Typography>
          <form ref={form} onSubmit={checkComplete}>
            <TextField
              style={text}
              required
              name="answer"
              label={<Typography style={{ color: "white" }}>Answer</Typography>}
              sx={textfield}
            />
            <Button
              variant="contained"
              sx={{ marginTop: "1rem", marginLeft: "5rem" }}
              type="submit"
            >
              Finish
            </Button>
          </form>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalText}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {/* <Link
                style={{ textDecoration: "None", color: "black" }}
                to={lastpage}
              > */}
              <Button
                onClick={navigation}
                style={buttons}
                variant="contained"
                color="primary"
              >
                {message}
              </Button>
              {/* </Link> */}
            </Typography>
          </Box>
        </Modal>
      </Grid>
    </div>
  );
};

export default Homepage;
