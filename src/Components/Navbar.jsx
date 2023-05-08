import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import {
  ButtonGroup,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
  Drawer,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import getCookie from "../hooks/getCookie";
import removeCookie from "../hooks/removeCookie";
import logo from "./Assets/ninja.png";

const btn = {
  marginRight: "20px",
  color: "black",
  backgroundColor: "transparent",
  height: "40px",
  width: "auto",
  "&:hover": {
    backgroundColor: "#F9A826",
    color: "black",
  },
};
const styles = {
  AppBar: {
    backgroundColor: "#65a5b9",
    width: "100%",
    height: "auto",
    py: "1px",
  },
  logo: {
    width: "80px",
    height: "80px",
    px: 1,
  },
  menutext: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "18px",
    textTransform: "none",
    fontFamily: "Figtree",
    // lineHeight: "29px",
    color: "black",
  },
  btn: {
    my: 2,
    color: "#B04759",
    mx: 1,
    width: "100%",

    "&:hover": {
      backgroundColor: "#E5E5E566",
      color: "black",
      borderBottom: "3px solid #F9A826",
      borderRadius: "0px",
    },
  },
};

const buttons = ["LeaderBoard", "Login", "Register"];
let token = getCookie("login");
let username = "";
let email = "";
if (token) {
  username = JSON.parse(getCookie("login")).username;
  email = JSON.parse(getCookie("login")).email;
}
console.log(username);

const handleOpen = () => {
  navigate("/scoreboard", {
    state: {
      email: props.row.email,
    },
  });
};

const logout = () => {
  let token = getCookie("login");
  if (token) {
    removeCookie("login");
    window.location.reload();
  }
};
export default function Appbar(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const openScoreboard = () => {
    navigate("/scoreboard", {
      state: {
        email: email,
      },
    });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", m: 2 }}>
      <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
        <img src={logo} alt="logo" style={styles.logo} />
      </Link>
      <Divider />
      <List>
        {buttons.map((item) => (
          <Link to={`/${item}`} style={{ textDecoration: "none" }}>
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText>
                  <Typography sx={styles.menutext}>{item}</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Grid sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            m: 2,
            backgroundColor: "#65a5b9",
            borderRadius: "10px",
            py: 1,
            boxShadow: "1px 1px 1px 1px #F9A826",
          }}
        >
          {/* Drawer for Mobile View */}

          <Button
            onClick={handleDrawerToggle}
            sx={{
              flexGrow: 1,
              display: {
                xs: "flex",
                sm: "flex",
                md: "none",
                lg: "none",
                xl: "none",
              },
              color: "white",
            }}
          >
            <Grid container xs={12}>
              <Grid item xs={1}>
                <MenuIcon />
              </Grid>
              <Grid xs={11}>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    width: "auto",
                  }}
                >
                  Sigma
                  <span style={{ color: "#B04759" }}>Quiz</span>
                </Typography>
              </Grid>
            </Grid>
          </Button>

          {/* ------------ Desktop -------------- */}

          <Grid
            container
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <Grid container xs={12}>
                <img src={logo} alt="logo" style={{ height: "50px" }} />
                <Typography
                  sx={{
                    color: "black",
                    fontWeight: 600,
                    fontSize: 30,
                    width: "auto",
                    ml: 2,
                  }}
                >
                  Sigma
                  <span style={{ color: "#B04759" }}>Quiz</span>
                </Typography>
              </Grid>
            </Link>

            {!token ? (
              <ButtonGroup variant="text">
                {buttons.map((button) => (
                  <Link
                    to={`/${button.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Button sx={btn}>{button}</Button>
                  </Link>
                ))}
              </ButtonGroup>
            ) : (
              <ButtonGroup variant="text">
                <Link
                  to="/leaderboard"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button sx={btn}>LeaderBoard</Button>
                </Link>
                <Button sx={btn} onClick={logout}>
                  Logout
                </Button>
                {/* <Link
                  to="/scoreboard"
                  style={{ textDecoration: "none", color: "black" }}
                > */}
                <Button sx={btn} onClick={openScoreboard}>
                  {username}
                </Button>
                {/* </Link> */}
              </ButtonGroup>
            )}
          </Grid>

          {/* <Grid
            container
            sx={{
              justifyContent: "flex-end",
              display: { xs: "none", sm: "none", md: "block" },
            }}
          >
            {!token ? (
              <ButtonGroup variant="text">
                {buttons.map((button) => (
                  <Link
                    to={`/${button.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Button sx={btn}>{button}</Button>
                  </Link>
                ))}
              </ButtonGroup>
            ) : (
              <ButtonGroup variant="text">
                <Link
                  to="/feed"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button sx={btn}>Feed</Button>
                </Link>
                <Button sx={btn} onClick={logout}>
                  Logout
                </Button>
                <Button sx={btn}>{username}</Button>
              </ButtonGroup>
            )}
          </Grid> */}
          <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "block" },

                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: 240,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
