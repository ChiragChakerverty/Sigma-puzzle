import React from "react";
import ReactDOM from "react-dom";
import { Grid, Typography } from "@mui/material";
import RadialBar from "../Pages/Radial/RadialBar";

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

const score = () => {
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
        <RadialBar />
      </Grid>
    </div>
  );
};

export default score;
