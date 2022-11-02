import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Fragment, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Button, Box, Card } from "@mui/material";

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

function VendorsForm({ getItems }) {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");

  const [phone_number, setPhoneNumber] = useState("");

  const [items, setItems] = useState({
    name: "",
    email: "",
    address: "",
    phone_number: "",
  });
  function onDataChange(e) {
    setItems({
      ...items,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const createdItems = {
      name: items.name,
      email: items.email,
      address: items.address,
      phone_number: items.phone_number,
    };

    fetch("http://localhost:3000/vendors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdItems),
    })
      .then((res) => res.json())
      .then((newItem) => {
        getItems(newItem);
        setItems({
          ...items,
          name: "",
          email: "",
          address: "",
          phone_number: "",
        });
      });
  }

  return (
    <Fragment>
      <Grid container spacing={10}>
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
              Create Vendor
            </Typography>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={items.name}
              onChange={onDataChange}
              sx={{ width: 500, m: 1 }}
            />

            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name="address"
              value={items.address}
              onChange={onDataChange}
              sx={{ width: 500, m: 1 }}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={items.email}
              onChange={onDataChange}
              sx={{ width: 500, m: 1 }}
            />

            <TextField
              id="outlined-basic"
              label="Phone-Number"
              variant="outlined"
              name="phone_number"
              value={items.phone_number}
              onChange={onDataChange}
              sx={{ width: 500, m: 1 }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 2 }}
              onClick={ handleSubmit }
              
            >
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
export default VendorsForm;
