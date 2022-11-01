import {
  Alert,
  Box,
  FormControl,
  Button,
  FormHelperText,
  TextField,
  Grid,
  unstable_composeClasses,
} from "@mui/material";
import React, { useState } from "react";
import Login from "./Login";
import Card from "@mui/material/Card";

const CategoriesForm = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  function handleOnSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((r) => r.json())
      .then((response) => setCategory(response));
    // .then((response) => console.log(response));
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
                  New Category
                </p>

                <Box sx={{ "& .MuiTextField-root": { m: 1, width: "35ch" } }}>
                  <div>
                    <FormControl>
                      {/* <FormHelperText id="my-helper-text">Category</FormHelperText> */}
                      <TextField
                        type="text"
                        variant="outlined"
                        label="Enter Category Name"
                        id="name"
                        autoComplete="on"
                        value={name}
                        sx={{ minWidth: 400 }}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>
                    <br />
                  </div>
                </Box>

                <br />
                <br />
                <div>
                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      onClick={handleOnSubmit}
                      type="submit"
                      style={{ fontSize: 16 }}
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

export default CategoriesForm;
