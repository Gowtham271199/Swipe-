// src/pages/Invoice.js
import React from "react";
import ProductTab from "../components/ProductsTab";
import InvoiceForm from "../components/InvoiceForm";

const Invoice = () => {
  return (
    <div>
      <InvoiceForm />
      <ProductTab />
    </div>
  );
};

export default Invoice;
