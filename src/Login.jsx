import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Supply Chains
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  // handleonchangedata
  function onChangeValue(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  //   handle submitted data
  function handleSubmit(e) {
    e.preventDefault();
    const logInUser = {
      email: formData.email,
      password: formData.password,
    };

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInUser),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          sessionStorage.setItem("user_id", JSON.stringify(user.id));
          setFormData({
            ...formData,
            email: "",
            password: "",
          });
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#29339B" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              name="email"
              value={formData.email}
              onChange={onChangeValue}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={onChangeValue}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#29339B" }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
            </Grid>
          </Box>
        </Box>
        <Typography component="h1" sx={{ backgroundColor: "red" }} variant="h5">
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </Typography>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
export default Login;
