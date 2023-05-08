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
import NoticeFeed from "../Components/NoticeFeed";

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

var modalText = "Try harder";

const LeaderBoard = () => {
  const navigate = useNavigate();

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
          paddingTop: "10vh",
        }}
      >
        <Grid
          item
          sx={{
            marginRight: "100px",
          }}
        >
          <img
            src="https://user-images.githubusercontent.com/82889656/232280407-869efdd0-75a0-47f2-93bc-1c9a41a50d89.png"
            alt="image"
            height={300}
            width={200}
          />
        </Grid>

        <Grid
          item
          sx={{
            p: 5,
            borderRadius: "20px",
            border: "2px solid #b04759",
            marginTop: "50px",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
              color: "#b04759",
              textAlign: "center",
            }}
          >
            Leader Board
          </Typography>
          <NoticeFeed />
        </Grid>
      </Grid>
    </div>
  );
};

export default LeaderBoard;
