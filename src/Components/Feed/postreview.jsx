import React, { useRef } from "react";
import { useState } from "react";
import { Grid, TextField, Button, Typography, Modal, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getCookie from "../../hooks/getCookie";

const buttons = { margin: "8px", backgroundColor: "#1D3557" };

var modalText = "Modal Open";

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
  m: 1,
};

function Postreview() {
  const form = useRef();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [lastpage, setLastpage] = useState("/feed");
  const [message, setMessage] = useState("Proceed");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigation = () => {
    if (lastpage === "/feed") {
      window.location.reload();
    } else {
      navigate(lastpage);
    }
  };
  let token = getCookie("login");
  let email = "";
  let username = "";
  if (token) {
    email = JSON.parse(getCookie("login")).email;
    username = JSON.parse(getCookie("login")).username;
  }
  const Createpost = async (e) => {
    e.preventDefault();
    console.log("FORM DATA");

    var form_data = {
      authoremail: email,
      authorname: username,
      gadgetname: form.current.gadgetname.value,
      category: form.current.category.value,
      model: form.current.model.value,
      price: form.current.price.value,
      review: form.current.review.value,
      rate: form.current.rate.value,
    };
    console.log(form_data);

    await axios
      .post(
        "https://puzzle-backend-ymlo.onrender.com/api/post/createpost",
        form_data
      )
      .then((response) => {
        console.log(response);
        modalText = "Post created successfully";
        setLastpage("/feed");
        setMessage("Proceed");
      })
      .catch((error) => {
        modalText = error.response.data;
        setLastpage("/newreview");
        setMessage("Try Again");
        console.log(error);
      });

    handleOpen();
  };

  return (
    // <div style={{ height: "100vh" }}>
    <Grid
      container
      xs={12}
      sx={{
        mt: "50px",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={6}
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "flex",
          },
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          height: "100vh",
          p: 4,
        }}
      >
        <Typography variant="h3" style={{ color: "black", textAlign: "right" }}>
          Post Review
          <br />
          Let others Know <br />
        </Typography>
      </Grid>

      {/* ------------------------------------ */}
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
          backgroundColor: "#ffffff",
          p: 5,
        }}
      >
        <Grid item>
          <Typography
            variant="h5"
            sx={{
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
              m: 2,
            }}
          >
            Post a new review
          </Typography>
          <form ref={form} onSubmit={Createpost}>
            <TextField
              type="text"
              name="gadgetname"
              fullWidth
              sx={textfield}
              label="Gadget Name"
              placeholder="Enter Gadget name"
            />
            <TextField
              type="text"
              name="category"
              fullWidth
              label="Enter category"
              placeholder="Enter category"
              sx={textfield}
            />
            <TextField
              type="text"
              name="model"
              fullWidth
              label="Enter model"
              placeholder="Enter model"
              sx={textfield}
            />

            <TextField
              type="text"
              name="price"
              fullWidth
              label="Enter price"
              placeholder="Enter link"
              sx={textfield}
            />
            <TextField
              type="text"
              name="review"
              fullWidth
              label="Enter review"
              placeholder="Enter review"
              sx={textfield}
            />
            <TextField
              type="text"
              name="rate"
              fullWidth
              label="Enter rate"
              placeholder="Enter rate"
              sx={textfield}
            />
            <Button
              style={buttons}
              type="submit"
              variant="contained"
              color="primary"
            >
              Post
            </Button>
          </form>
        </Grid>
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
    // </div>
  );
}

export default Postreview;
