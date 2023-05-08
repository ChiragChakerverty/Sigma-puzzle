import React, { Component, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Modal,
  Box,
} from "@mui/material";
import { ButtonGroup } from "@mui/material";
import setCookie from "../hooks/setCookie";
import getCookie from "../hooks/getCookie";
import removeCookie from "../hooks/removeCookie";
import { useNavigate } from "react-router-dom";

const buttons = {
  margin: "8px",
  height: 50,
  backgroundColor: "#F9A826",
};
var modalText;

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
  color: "white",
};
const btn = {
  height: 70,
  width: "auto",
  margin: "5px",
  border: "none",
  fontSize: 12,
  color: "black",
  backgroundColor: "#83c5be",
  "&:hover": {
    border: "1px solid black",
  },
};
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      lastpage: "/",
      message: "PROCEED",
    };
  }
  state = {
    openModal: false,
  };

  onClickButton = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  changeHandler = (event) => {
    console.log("change handler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  navigation = () => {
    const navigate = useNavigate();
    //navigate('/Answered');
    useEffect(() => {
      let login = getCookie("login");
      if (login) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const newstate = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(newstate);
    axios
      .post("https://puzzle-backend-ymlo.onrender.com/api/user/login", newstate)
      .then((response) => {
        console.log(response.data.user.level);
        const cookieState = {
          email: this.state.email,
          password: this.state.password,
          username: response.data.user.name,
          level: response.data.user.level,
        };
        console.log("LOGGED IN");
        modalText = "Logged In Successfully !!";
        console.log(modalText);
        removeCookie("login");
        setCookie("login", JSON.stringify(cookieState));

        this.setState({ openModal: true });
      })
      .catch((error) => {
        modalText = "Please Enter valid Email or Password!!";
        console.log(modalText);

        this.setState({
          openModal: true,
          lastpage: "/login",
          message: "TRY AGAIN",
        });
      });
    e.preventDefault();
  };

  onClick(event) {
    this.submitHandler();
    this.onClickButton();
  }

  render() {
    const { email, password } = this.state;
    return (
      <Grid
        container
        xs={12}
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#a6d0dd",
        }}
      >
        {/* ----------- left grid---------------- */}
        <Grid
          item
          xs={5}
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "flex",
            },
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#a6d0dd",
            height: "100vh",
            p: 4,
          }}
        >
          <Typography
            variant="h3"
            style={{ color: "white", textAlign: "right" }}
          >
            Join Us!! <br />
            <span style={{ color: "#F9A826" }}>
              Explore the Skill World{" "}
            </span>{" "}
            <br />
          </Typography>
        </Grid>

        {/* ------------------------------------------------ */}

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#a6d0dd",
            marginTop: "3rem",
            p: 5,
            border: "1px solid #F9A826",
          }}
        >
          <Grid item>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                m: 2,
              }}
            >
              Login
            </Typography>
            <form onSubmit={this.submitHandler}>
              <TextField
                type="email"
                name="email"
                value={email}
                fullWidth
                label={
                  <Typography style={{ color: "white" }}>
                    Enter your email
                  </Typography>
                }
                onChange={this.changeHandler}
                sx={textfield}
              />
              <TextField
                type="password"
                name="password"
                value={password}
                fullWidth
                label={
                  <Typography style={{ color: "white" }}>
                    Enter your password
                  </Typography>
                }
                placeholder="Enter your password"
                onChange={this.changeHandler}
                sx={textfield}
              />
              <Button
                style={buttons}
                type="submit"
                variant="contained"
                color="primary"
                onClick={this.onClick}
              >
                Login
              </Button>
            </form>

            <ButtonGroup
              sx={{
                display: "flex",
                backgroundColor: "transparent",
                mt: "100px",
                justifyContent: "center",
                boxShadow: "none",
              }}
            >
              <Button sx={btn}>
                <Link
                  style={{ textDecoration: "None", color: "black" }}
                  href={`/forgotpassword`}
                >
                  Forgot Password
                </Link>
              </Button>
              <Link
                style={{ textDecoration: "None", color: "black" }}
                href="/register"
              >
                <Button sx={btn}>New User? Sign Up</Button>
              </Link>
            </ButtonGroup>
          </Grid>
        </Grid>

        <Modal
          open={this.state.openModal}
          onClose={this.onCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalText}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Link
                style={{ textDecoration: "None", color: "black" }}
                href={this.state.lastpage}
              >
                <Button style={buttons} variant="contained" color="primary">
                  {this.state.message}
                </Button>
              </Link>
            </Typography>
          </Box>
        </Modal>
      </Grid>
    );
  }
}

export default Signin;
