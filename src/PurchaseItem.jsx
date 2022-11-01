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
import PurchaseItemForm from "./PurchaseItemForm";

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

export default function PurchaseItem() {
  const [isAdding, setIsAdding] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/purchaseitems")
      .then((r) => r.json())
      .then((items) => {
        setItems(items);
      });
  }, []);

  function getItems(newItemsReceived) {
    const updateItems = [...items, newItemsReceived];
    setItems(updateItems);
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
        Purchase Items
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
            Add PurchaseItem
          </Button>

          {isAdding ? <PurchaseItemForm getItems={getItems} /> : null}

          <Table
            sx={{
              minWidth: 1000,
              ml: 10,
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Product</StyledTableCell>
                <StyledTableCell align="right">Vendor</StyledTableCell>
                <StyledTableCell align="right">Invoice</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.product.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.vendor.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.invoice_id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="contained">Edit</Button>
                    <Button
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
