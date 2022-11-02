import React, { Fragment ,useState, useEffect } from "react";
import {
  Alert,
  Box,
  FormControl,
  Card,
  Button,
  FormHelperText,
  TextField,
  Grid,
  unstable_composeClasses,
  Typography,

} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Container } from "@mui/system";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function ProductsForm() {
  const [category_id, setCategory] = React.useState("");
  const [products, setProducts] = useState([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const [categories, setCategories] = useState([]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  // fetches categories
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((r) => r.json())
      .then((data) => setCategories(data));
  }, []);
  const dot = { name, description, category_id };

  console.log(dot);

  // function handleOnSubmit(e){
  //   e.preventDefault();
  //   fetch("http://localhost:3000/categories",{
  //       method: "POST",
  //       headers: {
  //           "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({name}),
  //   })
  //   .then((r) => r.json())
  //   .then(response => setCategory(response));
  //   // .then((response) => console.log(response));
  // }

  function handleOnSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dot),
    })
      .then((r) => r.json())
      .then((response) => setProducts(response));
    // .then((response) => console.log(response));
  }

  return (
    <Fragment>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          sx={{
            ml: 50,
          }}
        >
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 450,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Create Products 
            </Typography>
            <TextField
              id="name"
              label="Enter Product name"
              variant="outlined"
              // name="quantity"
              value={name}
              sx={{ width: 500, m: 1 }}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              id="description"
              label="Enter Description name"
              variant="outlined"
              // name="quantity"
              value={description}
              sx={{ width: 500, m: 1 }}
              onChange={(e) => setDescription(e.target.value)}
            />

            <FormControl
              sx={{
                m: 1,
                width: 500,
              }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                input={<OutlinedInput label="Category" />}
                name="category"
                onChange={handleChange}
              >
                {categories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 2 }}
              onClick={handleOnSubmit}
            >
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default ProductsForm;
