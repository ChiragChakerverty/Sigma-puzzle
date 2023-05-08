import React from "react";
import { Grid, Typography } from "@mui/material";

const About = () => {
  return (
    <div>
      <Grid
        container
        xs={12}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          p: 2,
          my: 3,
        }}
      >
        {/* Item 1 */}
        <Grid
          item
          xs={10}
          sx={{
            py: 2,
          }}
        >
          <Typography
            sx={{
              color: "black",
              textAlign: "right",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Confused about which gadget to buy? 😕
          </Typography>

          <Typography
            sx={{
              color: "black",
              textAlign: "right",
              fontSize: "1rem",
              letterSpacing: "0.1rem",
              mt: "20px",
            }}
          >
            We are here to help you. <br />
            Find the best gadgets for your needs. <br />
            Read reviews from other users. <br />
          </Typography>
        </Grid>

        {/* Item 2 */}
        <Grid
          item
          xs={10}
          sx={{
            py: 2,
          }}
        >
          <Typography
            sx={{
              color: "black",
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Help others make the right choice. 😊
          </Typography>

          <Typography
            sx={{
              color: "black",
              textAlign: "left",
              fontSize: "1rem",
              letterSpacing: "0.1rem",
              mt: "20px",
            }}
          >
            Share your experience with others. <br />
            Help others make the right choice. <br />
            Write a review for a gadget you have used.
          </Typography>
        </Grid>

        {/* Item 3 */}
        <Grid
          item
          xs={10}
          sx={{
            py: 2,
          }}
        >
          <Typography
            sx={{
              color: "black",
              textAlign: "right",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Confused about which gadget to buy? 😕
          </Typography>

          <Typography
            sx={{
              color: "black",
              textAlign: "right",
              fontSize: "1rem",
              letterSpacing: "0.1rem",
              mt: "20px",
            }}
          >
            We are here to help you. <br />
            Find the best gadgets for your needs. <br />
            Read reviews from other users. <br />
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
