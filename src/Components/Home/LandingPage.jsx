import React from "react";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
// import gif from "../Assets/gif.gif";
import Lottie from "react-lottie";
import animationData from "../Assets/ninja1.json";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getCookie from "../../hooks/getCookie";

const LandingPage = () => {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const gotoGame = () => {
    let login = getCookie("login");
    if (login) {
      let loginparse = JSON.parse(login);
      const level = "/level" + loginparse.level;
      if (loginparse.level == 6) {
        navigate("/scoreboard", {
          state: {
            email: loginparse.email,
          },
        });
      } else {
        console.log(loginparse.level);
        navigate(level);
      }
    } else {
      navigate("/level1");
    }
  };
  return (
    <div>
      <Grid
        container
        xs={12}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          minHeight: "100vh",
        }}
      >
        <Grid item xs={10} sm={10} lg={4}>
          <Typography
            sx={{
              color: "black",
              textAlign: "right",
              fontSize: "3rem",
              fontWeight: "bold",
            }}
          >
            Sigma
            <span style={{ color: "#B04759" }}>Quiz </span>
          </Typography>

          <Typography
            sx={{
              mt: "20px",
              color: "black",
              textAlign: "right",
              fontSize: "1.5rem",
              // fontWeight: "bold",
              letterSpacing: "0.1rem",
            }}
          >
            ""Start Game to move to most the important step of the game""
          </Typography>

          {/* <Link to="/feed" style={{ textDecoration: "none" }}> */}
          <Button
            sx={{
              mt: "20px",
              backgroundColor: "#B04759",
              color: "black",
              fontSize: "1rem",
              fontWeight: "bold",
              letterSpacing: "0.1rem",
              borderRadius: "10px",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#fff",
                color: "black",
                border: "1px solid #B04759",
              },
            }}
            onClick={gotoGame}
          >
            Start Game
          </Button>
          {/* </Link> */}
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            px: "20px",
            justifyContent: "center",
            alignItems: "center",
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "block",
            },
          }}
        >
          <Lottie options={defaultOptions} height={400} width={400} />
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;
