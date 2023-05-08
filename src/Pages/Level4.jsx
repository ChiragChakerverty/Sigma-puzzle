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
import MultipleValueTextInput from "react-multivalue-text-input";
import ReactPlayer from "react-player";

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
  m: 1,
};

const buttons = { margin: "8px", backgroundColor: "#1D3557" };
const text = { padding: 2, margin: "3px 0" };

var modalText = "You Choose Wrong Suspects !!";

const Homepage = () => {
  const navigate = useNavigate();
  const form = useRef();
  const [formitems, setItems] = useState([]);
  let answer = ["Eminem", "Geazy"];
  answer.sort();

  ////////////// Time Function
  const d = new Date();
  let time = d.getTime();
  let level4time = getCookie("level4");
  if (!level4time) {
    let cookieState = {
      startTime: time,
      endTime: 0,
    };
    setCookie("level4", JSON.stringify(cookieState));
  }

  const [open, setOpen] = useState(false);
  const [lastpage, setLastpage] = useState("/level4");
  const [message, setMessage] = useState("Retry");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigation = () => {
    if (lastpage === "/level4") {
      window.location.reload();
    } else {
      navigate(lastpage);
    }
  };

  const checkComplete = (e) => {
    e.preventDefault();
    console.log(formitems);
    let data = formitems;
    data.sort();
    let login = getCookie("login");

    if (login) {
      let loginp = JSON.parse(login);
      /// calculate time
      const d = new Date();
      let time = d.getTime();
      let getstarttime = getCookie("level4");
      let getstarttimep = JSON.parse(getstarttime);
      let totalTime = time - getstarttimep.startTime;
      console.log(answer);
      console.log(data);
      if (
        JSON.stringify(answer).toLocaleLowerCase() ===
        JSON.stringify(data).toLocaleLowerCase()
      ) {
        removeCookie("level4");
        let cookieStatetime = {
          startTime: getstarttimep.startTime,
          endTime: time,
        };
        setCookie("level4", JSON.stringify(cookieStatetime));
        console.log(totalTime);
        ///////
        const cookieState = {
          email: loginp.email,
          password: loginp.password,
          username: loginp.username,
          level: 5,
        };
        removeCookie("login");
        setCookie("login", JSON.stringify(cookieState));
        axios
          .post("https://puzzle-backend-ymlo.onrender.com/api/game/level4", {
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
        modalText = "Congratulations !! You can be a rapper in future";
        setMessage("Next Level");
        setLastpage("/level5");
      } else {
        axios
          .post("https://puzzle-backend-ymlo.onrender.com/api/game/level4", {
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
        modalText = "You Choose Wrong rappers !!";
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
            marginTop: "100px",
          }}
        >
          {/* <Lottie options={defaultOptions} height={350} width={800} /> */}
          <Grid
            item
            sx={{
              height: 400,
              width: 1000,
            }}
          >
            <img src="https://imgix.bustle.com/uploads/image/2018/9/27/a22a60e8-7330-4667-bb28-5aa5929768da-geazy-eminem.jpg?w=560&h=339&fit=crop&crop=faces&auto=format%2Ccompress"></img>
          </Grid>
          <Typography
            sx={{
              fontSize: "2rem",
              color: "#b04759",
            }}
          >
            Rapper Mystery !! Find out the rappers
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#black",
            }}
          ></Typography>

          <form ref={form} onSubmit={checkComplete}>
            <MultipleValueTextInput
              onItemAdded={(item, allItems) => {
                console.log(`Item added: ${item}`);
                setItems(allItems);
              }}
              onItemDeleted={(item, allItems) => {
                console.log(`Item Deleted: ${item}`);
                setItems(allItems);
              }}
              label="Items"
              name="items"
              placeholder="Enter Items"
            />
            <Button
              variant="contained"
              sx={{ marginTop: "1rem", marginBottom: "-2rem" }}
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
