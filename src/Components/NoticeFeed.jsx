import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#dee2e6",
    color: "#000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

// function createData(Rank, Username, Time) {
//   return { Rank, Username, Time};
// }

// const rows = [
//   createData(1, "Bhushan21z", 100),
//   createData(2, "Noob_Lord", 200)
// ];

function RowTable(props) {
  const navigate = useNavigate();
  const handleOpen = () => {
    navigate("/scoreboard", {
      state: {
        email: props.row.email,
      },
    });
  };

  return (
    <div>
      <StyledTableCell>
        <Button color="primary" onClick={handleOpen}>
          {props.row.username}
        </Button>
      </StyledTableCell>
    </div>
  );
}

export default function CustomizedTables() {
  const [data, setData] = useState([]);
  const minute = 1000 * 60;
  const hour = minute * 60;
  useEffect(() => {
    getData();
  }, data);
  const getData = () => {
    axios
      .get("https://puzzle-backend-ymlo.onrender.com/api/game/leaderboard")
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Rank</StyledTableCell>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>Total Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow>
              <StyledTableCell> {row.rank}</StyledTableCell>
              <RowTable row={row} />
              <StyledTableCell>
                {" "}
                {Math.round((row.time / 1000 / 60) % 60)} minutes
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
