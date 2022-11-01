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
import { Button } from "@mui/material";

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

function PurchaseItemForm({ getItems }) {
  // fetchproducts
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((r) => r.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);
  //fetch vendors
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/vendors")
      .then((r) => r.json())
      .then((vendors) => {
        setVendors(vendors);
      });
  }, []);
  //fetch invoices
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/invoices")
      .then((r) => r.json())
      .then((invoices) => {
        setInvoices(invoices);
      });
  }, []);

  const [items, setItems] = useState({
    product_id: "",
    vendor_id: "",
    invoice_id: "",
    quantity: "",
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
      product_id: items.product_id,
      vendor_id: items.vendor_id,
      invoice_id: items.invoice_id,
      quantity: items.quantity,
    };

    fetch("http://localhost:3000/purchaseitems", {
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
          product_id: "",
          vendor_id: "",
          invoice_id: "",
          quantity: "",
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
              Create PurchaseItems
            </Typography>
            <FormControl
              sx={{
                m: 1,
                width: 500,
              }}
            >
              <InputLabel>Product</InputLabel>
              <Select name="product_id" onChange={onDataChange}>
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
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
              <Select name="vendor_id" onChange={onDataChange}>
                {vendors.map((vendor) => (
                  <MenuItem key={vendor.id} value={vendor.id}>
                    {vendor.name}
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
              <InputLabel>Invoice Number</InputLabel>
              <Select
                input={<OutlinedInput label="Invoice" />}
                name="invoice_id"
                onChange={onDataChange}
              >
                {invoices.map((invoice) => (
                  <MenuItem key={invoice.id} value={invoice.id}>
                    {invoice.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              name="quantity"
              value={items.quantity}
              onChange={onDataChange}
              sx={{ width: 500, m: 1 }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
export default PurchaseItemForm;
