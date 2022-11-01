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
import { useState, useEffect } from "react";

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

export default function Stock() {
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/stocks")
      .then((r) => r.json())
      .then((stocks) => {
        setStocks(stocks);
      });
  }, []);
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Typography variant="h4" gutterBottom>
            Stock Items
          </Typography>
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
                <StyledTableCell align="right">Quantity</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock) => (
                <StyledTableRow key={stock.id}>
                  <StyledTableCell component="th" scope="row">
                    {stock.product.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {stock.quantity}
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
