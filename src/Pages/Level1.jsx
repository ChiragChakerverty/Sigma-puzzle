import { Button, Grid, Typography, Modal, Box } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import getCookie from "../hooks/getCookie";
import setCookie from "../hooks/setCookie";
import removeCookie from "../hooks/removeCookie";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../Components/Assets/level1.json";
import { useState, useEffect } from "react";

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

const buttons = { margin: "8px", backgroundColor: "#1D3557" };
const text = { padding: 2, margin: "3px 0" };

var modalText = "You should Do Something First !!";

const Homepage = () => {
  const navigate = useNavigate();

  ////////////// Time Function
  const d = new Date();
  let time = d.getTime();
  let level1time = getCookie("level1");
  if (!level1time) {
    let cookieState = {
      startTime: time,
      endTime: 0,
    };
    setCookie("level1", JSON.stringify(cookieState));
  }
  //const [time, setTime] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCount((count) => count + 1);
  //   }, 1000);
  // });

  const [open, setOpen] = useState(false);
  const [lastpage, setLastpage] = useState("/level1");
  const [message, setMessage] = useState("Try Again");
  const handleOpen = () => {
    setOpen(true);
    let login = getCookie("login");
    if (login) {
      modalText = "Good Work !!! Registering is the Most Important Thing.";
      setMessage("Next Level");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const checkComplete = () => {
    let login = getCookie("login");

    if (login) {
      let loginp = JSON.parse(login);
      /// calculate time
      const d = new Date();
      let time = d.getTime();
      let getstarttime = getCookie("level1");
      let getstarttimep = JSON.parse(getstarttime);
      let totalTime = time - getstarttimep.startTime;
      removeCookie("level1");
      let cookieStatetime = {
        startTime: getstarttimep.startTime,
        endTime: time,
      };
      setCookie("level1", JSON.stringify(cookieStatetime));
      console.log(totalTime);
      ///////
      const cookieState = {
        email: loginp.email,
        password: loginp.password,
        username: loginp.username,
        level: 2,
      };
      removeCookie("login");
      setCookie("login", JSON.stringify(cookieState));
      axios
        .post("https://puzzle-backend-ymlo.onrender.com/api/game/level1", {
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
      navigate("/level2");
    } else {
      console.log("Retry");
      window.location.reload();
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
          <Lottie options={defaultOptions} height={450} width={800} />
          <Typography
            sx={{
              fontSize: "2rem",
              color: "#b04759",
            }}
          >
            {" "}
            Register yourself to clear Level 1
          </Typography>

          <Button
            variant="contained"
            sx={{ marginTop: "2rem" }}
            onClick={handleOpen}
          >
            Next Level
          </Button>
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
                onClick={checkComplete}
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
