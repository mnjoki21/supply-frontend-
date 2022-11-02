import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import VendorsForm from "./VendorsForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
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

// const [items, setItems]= React.useState([])

export default function Vendor() {
  const [isAdding, setIsAdding] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/vendors")
      .then((r) => r.json())
      .then((items) => {
        setItems(items);
      });
  }, []);
  function getItems(newItemsReceived) {
    const updateItems = [...items, newItemsReceived];
    setItems(updateItems);
  }

  function handleDelete(id) {
    fetch(`http://localhost:3000/vendors/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const deletion = items.filter((item) => item.id !== id);
        setItems(deletion);
      });
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Typography variant="h4" sx={{ ml: 50 }} gutterBottom>
        Vendors
      </Typography>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              mb: 4,
              ml: 6,
            }}
            onClick={() => setIsAdding((isAdding) => !isAdding)}
          >
            Add Vendor
          </Button>

          {isAdding ? <VendorsForm getItems={getItems} /> : null}

          <Table
            sx={{
              minWidth: 1000,
              ml: 10,
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Address</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="right">{item.name}</StyledTableCell>
                  <StyledTableCell align="right">{item.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {item.address}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.phone_number}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="contained">Edit</Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      variant="contained"
                      sx={{
                        backgroundColor: "red",
                        ml: 2,
                      }}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Container>
  );
}
