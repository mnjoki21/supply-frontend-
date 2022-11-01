import React, {Fragment, useState, useEffect } from "react";
import {
  Alert,
  Box,
  FormControl,
  Card,
  Button,
  FormHelperText,
  TextField,
  Grid,
  Typography,
  unstable_composeClasses,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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


function InvoiceForm() {
  const [purchaseorder, setPurchaseorder] = React.useState("");
  const [product, setProduct] = useState("");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [accountname, setAccountname] = useState("");
  const [errors, setErrors] = useState([]);

  const [purchaseorders, setPurchaseorders] = useState([]);
  const handleChange = (event) => {
    setPurchaseorder(event.target.value);
  };

  const [products, setProducts] = useState([]);
  const handleChangeProduct = (event) => {
    setProduct(event.target.value);
  };

  const [vendors, setVendors] = useState([]);
  const handleChangeVendor = (event) => {
    setVendors(event.target.value);
  };

  // fetches categories
  useEffect(() => {
    fetch("http://localhost:3000/purchaseorders")
      .then((r) => r.json())
      .then((data) => setPurchaseorders(data));
  }, []);

  // fetches products
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((r) => r.json())
      .then((data) => setProducts(data));
  }, []);

  // fetches vendors
  useEffect(() => {
    fetch("http://localhost:3000/vendors")
      .then((r) => r.json())
      .then((data) => setVendors(data));
  }, []);

  function handleOnSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountname,
        amount,
        quantity,

        // description,
        product,
        vendor,
        purchaseorder,
      }),
    })
      .then((r) => r.json())
      .then((response) => setProduct(response));
    // .then((response) => console.log(response));
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
              height: 650,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Create Invoice
            </Typography>
            <TextField
              id="accountname"
              label="Enter Account Name"
              variant="outlined"
              name="account"
              value={accountname}
              onChange={(e) => setAccountname(e.target.value)}
              sx={{ width: 500, m: 1 }}
            />
            <TextField
              id="amount"
              label="Enter Amount"
              variant="outlined"
              name="amount"
              value={amount}
              sx={{ width: 500, m: 1 }}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              id="quantity"
              label="Enter Quantity"
              variant="outlined"
              name="quantity"
              value={quantity}
              sx={{ width: 500, m: 1 }}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <FormControl
              sx={{
                m: 1,
                width: 500,
              }}
            >
              <InputLabel>Purchase Order</InputLabel>
              <Select
                // input={<OutlinedInput label="Invoice" />}
                name="invoice_id"
                onChange={handleChange}
                value={purchaseorder}
                label="Purchase Order"
              >
                {purchaseorders.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              sx={{
                m: 1,
                width: 500,
              }}
            >
              <InputLabel>Products</InputLabel>
              <Select
                // input={<OutlinedInput label="Invoice" />}
                name="invoice_id"
                onChange={handleChangeProduct}
                value={product}
                label="Product"
              >
                {products.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              sx={{
                m: 1,
                width: 500,
              }}
            >
              <InputLabel>Vendor</InputLabel>
              <Select
                // input={<OutlinedInput label="Invoice" />}
                name="invoice_id"
                onChange={handleChangeVendor}
                value={vendor}
                label="Vendor"
              >
                {vendors.map((item) => (
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

export default InvoiceForm;
