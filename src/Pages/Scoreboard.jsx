import React from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import Score from "../Components/score";
import { useEffect, useState } from "react";
import axios from "axios";

const ScoreBoard = () => {
  const location = useLocation();
  console.log("Email", location.state.email);
  const email = location.state.email;

  // const [data, setData]= useState({});

  return (
    <div>
      <Navbar />
      <Score email={email} />
    </div>
  );
};

export default ScoreBoard;
