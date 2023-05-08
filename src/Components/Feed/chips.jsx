import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray() {
  const [chipData] = React.useState([
    { key: 0, label: "All" },
    { key: 1, label: "Laptop" },
    { key: 2, label: "Tablet" },
    { key: 3, label: "Smart Watch" },
    { key: 4, label: "Smart Phone" },
    { key: 5, label: "Headphone" },
    { key: 6, label: "Earphone" },
    { key: 7, label: "Speaker" },
    { key: 8, label: "Camera" },
    { key: 9, label: "TV" },
  ]);

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        boxShadow: "none",
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        if (data.label === "React") {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={data.key}>
            <Chip
              sx={{
                minWidth: "100px",
                height: "50px",
                borderRadius: "10px",
                border: "1px solid black",
                

                "&:hover": {
                  border: "1px solid white",
                  cursor: "pointer",
                },
              }}
              icon={icon}
              label={data.label}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
