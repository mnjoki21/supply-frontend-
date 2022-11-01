import React from "react";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Product from "./Product";
import Vendor from "./Vendor";
import PurchaseItem from "./PurchaseItem";
import Category from "./Category";
import PurcahseOrder from "./PurchaseOrder";
import Invoice from "./InvoiceForm";
import Stock from "./Stock";
import User from "./User";
import { useEffect, useState } from "react";
import Login from "./Login";
import Main from "./Main1";

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/stocks")
      .then((r) => r.json())
      .then((stocks) => {
        setStocks(stocks);
      });
  }, []);

  if (!user) return <Login onLogin={setUser} />;
  return (
    <Fragment>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route exact path="/" element={<Main stocks={stocks} user={user} />} />
        <Route exact path="/categories" element={<Category />} />
        <Route exact path="/vendors" element={<Vendor />} />
        <Route exact path="/products" element={<Product />} />
        <Route exact path="/purchaseitems" element={<PurchaseItem />} />
        <Route exact path="/purchaseorders" element={<PurcahseOrder />} />
        <Route exact path="/purchaseitems" element={<PurchaseItem />} />
        <Route exact path="/invoices" element={<Invoice />} />
        <Route exact path="/stocks" element={<Stock />} />
        <Route exact path="/users" element={<User />} />
      </Routes>
    </Fragment>
  );
}
