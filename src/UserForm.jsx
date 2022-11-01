import {
  Alert,
  Box,
  FormControl,
  Button,
  FormHelperText,
  TextField,
  Grid,
} from "@mui/material";
import Login from "./Login";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";

const UserForm = (onSignIn) => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  function onChangeValue(e) {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  }

  //   handle submitted data
  function handleSubmit(e) {
    e.preventDefault();
    const signInUser = {
      email: signInData.email,
      password: signInData.password,
    };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInUser),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onSignIn(user);
          setSignInData({
            ...signInData,
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
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <Card sx={{ minWidth: 400 }}>
            <main>
              <form>
                <p
                  style={{
                    fontWeight: "bolder",
                    fontSize: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  Create Users
                </p>

                <Box sx={{ "& .MuiTextField-root": { m: 1, width: "35ch" } }}>
                  <div>
                    <FormControl>
                      <FormHelperText id="my-helper-text">
                        Enter your Email Address
                      </FormHelperText>
                      <TextField
                        type="email"
                        variant="outlined"
                        label="Email"
                        id="email"
                        name="email"
                        autoComplete="on"
                        value={signInData.email}
                        sx={{ minWidth: 400 }}
                        onChange={onChangeValue}
                      />
                    </FormControl>
                    <br />
                    <FormControl>
                      <FormHelperText id="my-helper-text">
                        Enter your password
                      </FormHelperText>
                      <TextField
                        type="password"
                        label="Password"
                        id="password"
                        name="password"
                        sx={{ minWidth: 400 }}
                        autoComplete="current-password"
                        value={signInData.password}
                        onChange={onChangeValue}
                      />
                    </FormControl>
                  </div>
                </Box>

                <br />
                <br />
                <div>
                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ fontSize: 16 }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Box>
                  <br />

                  <div>
                    {errors.map((err) => (
                      <>
                        <Alert
                          key={err}
                          severity="error"
                          sx={{ width: "100%" }}
                        >
                          {err}
                        </Alert>
                      </>
                    ))}
                  </div>
                </div>
              </form>
            </main>
          </Card>
        </Box>
      </Grid>
    </>
  );
};

export default UserForm;
