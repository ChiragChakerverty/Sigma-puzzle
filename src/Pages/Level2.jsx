import { Button, Grid, Typography, Modal, Box, TextField } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
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
const text = { padding: 2, margin: "15px 0" };

var modalText = "Read Every word Carefully !!";

const Homepage = () => {
  const navigate = useNavigate();
  const form = useRef();

  ////////////// Time Function
  const d = new Date();
  let time = d.getTime();
  let level2time = getCookie("level2");
  if (!level2time) {
    let cookieState = {
      startTime: time,
      endTime: 0,
    };
    setCookie("level2", JSON.stringify(cookieState));
  }

  const [open, setOpen] = useState(false);
  const [lastpage, setLastpage] = useState("/level2");
  const [message, setMessage] = useState("Try Again");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigation = () => {
    if (lastpage === "/level2") {
      window.location.reload();
    } else {
      navigate(lastpage);
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
      let getstarttime = getCookie("level2");
      let getstarttimep = JSON.parse(getstarttime);
      let totalTime = time - getstarttimep.startTime;
      if (answer == "johnny") {
        removeCookie("level2");
        let cookieStatetime = {
          startTime: getstarttimep.startTime,
          endTime: time,
        };
        setCookie("level2", JSON.stringify(cookieStatetime));
        console.log(totalTime);
        ///////
        const cookieState = {
          email: loginp.email,
          password: loginp.password,
          username: loginp.username,
          level: 3,
        };
        removeCookie("login");
        setCookie("login", JSON.stringify(cookieState));
        axios
          .post("https://puzzle-backend-ymlo.onrender.com/api/game/level2", {
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
          "Congratulations !!! Sometimes common sense gives you the answer.";
        setMessage("Next Level");
        setLastpage("/level3");
      } else {
        axios
          .post("https://puzzle-backend-ymlo.onrender.com/api/game/level2", {
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
        modalText = "Read Each word Carefully !!";
        setMessage("Try Again");
      }
      handleOpen();
    } else {
      modalText = "Login to Play";
      setMessage("Retry");
      console.log("Retry");
      //window.location.reload();
      handleOpen();
      navigate("/login");
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
            border: "2px solid #F9A826",
            marginTop: "50px",
          }}
        >
          {/* <Lottie options={defaultOptions} height={350} width={800} /> */}
          <Typography
            sx={{
              fontSize: "1.5rem",
              color: "black",
            }}
          >
            {" "}
            Read the Text Carefully.
          </Typography>
          <Typography
            sx={{
              fontSize: "1.5rem",
              color: "#b04759",
            }}
          >
            {" "}
            Johnny's mother had three children. The first child was named April
            The second child was named May. What was the third child's name
          </Typography>
          <Typography
            sx={{
              fontSize: "1.5rem",
              color: "#F9A826",
            }}
          >
            {" "}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.5rem",
              color: "black",
            }}
          >
            {" "}
            Write Answer to Proceed !!!
          </Typography>
          <form ref={form} onSubmit={checkComplete}>
            <TextField
              style={text}
              required
              name="answer"
              label={<Typography style={{ color: "black" }}>Answer</Typography>}
              sx={textfield}
            />
            <Button
              variant="contained"
              sx={{ marginTop: "2rem", marginLeft: "3rem" }}
              type="submit"
            >
              Next Level
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
