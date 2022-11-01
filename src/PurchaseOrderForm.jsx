import {
  Alert,
  Box,
  FormControl,
  Button,
  FormHelperText,
  TextField,
  Grid,
  Typography,
  useStepContext,
} from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
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

const PurchaseOrderForm = () => {
  const [product_id, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [vendor_id, setVendor] = useState("");
  const [ordernumber, setOrdernumber] = useState("");

  const [errors, setErrors] = useState([]);

  // const history = useNavigate();

  const [vendors, setVendors] = useState([]);
  const handleChange = (event) => {
    setVendor(event.target.value);
  };

  const [products, setProducts] = useState([]);
  const handleChangeProduct = (event) => {
    setProduct(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:3000/vendors")
      .then((r) => r.json())
      .then((data) => setVendors(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((r) => r.json())
      .then((data) => setProducts(data));
  }, []);

  const [purchaseorder, setPurchaseorder] = useState([]);

  function handleOnSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/purchaseorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id,
        amount,
        quantity,
        vendor_id,
        ordernumber: ordernumber,
      }),
    })
      .then((r) => r.json())
      .then((response) => setPurchaseorder(response));
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
              height: 450,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Create Purchase Order
            </Typography>
            <FormControl
              sx={{
                m: 1,
                width: 500,
              }}
            >
              <InputLabel>Order No.</InputLabel>
              <Select
                name="product_id"
                onChange={(e) => setOrdernumber(e.target.value)}
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
                name="vendor_id"
                onChange={(e) => setVendor(e.target.value)}
              >
                {vendors.map((vendor) => (
                  <MenuItem key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <FormControl
              sx={{
                m: 1,
                width: 500,
              }}
            >
              <InputLabel>Quantity</InputLabel>
              <Select
                input={<OutlinedInput label="quantity" />}
                name="quantity"
                onChange={(e) => setQuantity(e.target.value)}
              >
                {invoices.map((invoice) => (
                  <MenuItem key={invoice.id} value={invoice.id}>
                    {invoice.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              name="quantity"
              value={quantity}
              sx={{ width: 500, m: 1 }}
              onChange={(e) => setQuantity(e.target.value)}
            />
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
};

export default PurchaseOrderForm;
