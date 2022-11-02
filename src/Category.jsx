import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import CategoriesForm from "./CategoriesForm";
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
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 30,
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

export default function Category() {
  const [category, setCategory] = React.useState([]);
  console.log(category);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((r) => r.json())
      .then((data) => setCategory(data));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:3000/categories/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const deletion = category.filter((item) => item.id !== id);
        setCategory(deletion);
      });
  }

  function deleteEvent(id) {
    const updatedEvents = category.filter((one) => one.id !== id);
    setCategory(updatedEvents);
  }

  const [isAdding, setIsAdding] = useState(false);
  const [items, setItems] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:3000/categories")
  //     .then((r) => r.json())
  //     .then((items) => {
  //       setItems(items);
  //     });
  // }, []);

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
        ml: 15
      }}
    >
      <Typography variant="h4" sx={{ ml: 50 }} gutterBottom>
        Categories
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
            Add Category
          </Button>

          {isAdding ? <CategoriesForm getItems={getItems} /> : null}

          <Table
            sx={{
              minWidth: 1000,
              ml: 10,
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>CATEGORY</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
                {/* <StyledTableCell align="right">Edit</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {category.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <Button variant="contained">Edit</Button>
                    <Button
                      onClick={() => handleDelete(row.id)}
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
