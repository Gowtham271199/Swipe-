// src/redux/invoicesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoices: [],
    products: [],
  },
  reducers: {
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.invoices.findIndex((invoice) => invoice.id === action.payload.id);
      if (index !== -1) {
        state.invoices[index] = action.payload.updatedInvoice;
      }
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload.updatedProduct;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addInvoice, updateInvoice, deleteInvoice, addProduct, updateProduct, deleteProduct } = invoicesSlice.actions;
export const selectInvoiceList = (state) => state.invoices.invoices;
export const selectProductList = (state) => state.invoices.products;
export default invoicesSlice.reducer;
