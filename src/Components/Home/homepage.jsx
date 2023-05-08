import React from "react";
import { Divider, Grid } from "@mui/material";
import LandingPage from "./LandingPage";
import About from "./About";

const homepage = () => {
  return (
    <div>
      <Grid
        container
        xs={12}
        sx={{
          backgroundColor: "#A6D0DD",
          height: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* ----------------------------------- Heading -------------------------- */}
        <LandingPage />
      </Grid>
    </div>
  );
};

export default homepage;
