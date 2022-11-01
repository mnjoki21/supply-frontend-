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
import UserForm from "./UserForm";
import { Button } from "@mui/material";

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

export default function User() {
  const [users, setUsers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((r) => r.json())
      .then((users) => {
        setUsers(users);
      });
  }, []);

  function getUsers(newUsersCreated) {
    const updateUser = [...users, newUsersCreated];
    setUsers(updateUser);
  }
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
            Users
          </Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{
              mb: 4,
              ml: 6,
            }}
            onClick={() => setIsAdding((isAdding) => !isAdding)}
          >
            Add User
          </Button>

          {isAdding ? <UserForm onSignIn={getUsers} /> : null}
          <Table
            sx={{
              minWidth: 1000,
              ml: 10,
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell align="right">Role</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Procument Officer
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
