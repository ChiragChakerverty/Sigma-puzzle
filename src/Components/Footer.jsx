import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function Footer() {
  return (
    <Grid
      container
      xs={12}
      sx={{
        backgroundColor: "#ffffff",
        color: "white",
        justifyContent: "center",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
        }}
      >
        <Container
          sx={{
            backgroundColor: "#FAFAFF",
            borderRadius: "10px",
            py: 2,
            boxShadow: "1px 1px 1px 1px #212225",
          }}
        >
          <Typography variant="body2" color="black">
            Made with ❤️ by Anjali
          </Typography>
        </Container>
      </Box>
    </Grid>
  );
}
