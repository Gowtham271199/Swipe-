import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../redux/invoicesSlice";
import generateRandomId from "../utils/generateRandomId"; // Adjust path if needed

const ProductForm = ({ productToEdit, onClose }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    group: ""
  });

  useEffect(() => {
    if (productToEdit) {
      setProductData(productToEdit);
    } else {
      setProductData({
        id: "",
        name: "",
        description: "",
        price: "",
        group: ""
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (productData.id) {
      dispatch(updateProduct({
        id: productData.id,
        updatedProduct: productData
      }));
    } else {
      dispatch(addProduct({ ...productData, id: generateRandomId() }));
    }
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.warn('onClose is not a function');
    }
  };

  return (
    <div>
      <h2>{productData.id ? "Edit Product" : "Add Product"}</h2>
      <input
        type="text"
        name="name"
        value={productData.name}
        onChange={handleChange}
        placeholder="Product Name"
      />
      <input
        type="text"
        name="description"
        value={productData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="price"
        value={productData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        type="text"
        name="group"
        value={productData.group}
        onChange={handleChange}
        placeholder="Group"
      />
      <button onClick={handleSubmit}>
        {productData.id ? "Update Product" : "Add Product"}
      </button>
    </div>
  );
};

export default ProductForm;
