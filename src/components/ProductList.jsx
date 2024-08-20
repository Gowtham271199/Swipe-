import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInvoice } from '../redux/invoicesSlice'; // Ensure this is correctly defined in your slice
import { Button, Table } from "react-bootstrap";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices); // Corrected selector path
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleDeleteInvoice = (id) => {
    dispatch(deleteInvoice(id));
  };

  return (
    <>
      <ProductForm productToEdit={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.name}</td>
              <td>{invoice.description}</td>
              <td>{invoice.price}</td>
              <td>
                <Button onClick={() => handleEditInvoice(invoice)}>Edit</Button>
                <Button onClick={() => handleDeleteInvoice(invoice.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductList;
