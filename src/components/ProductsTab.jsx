// src/components/ProductTab.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, deleteProduct } from "../redux/invoicesSlice";
import ProductForm from "./ProductForm";
import { Button, Table } from "react-bootstrap";

const ProductTab = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.invoices.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [productGroups, setProductGroups] = useState([]);

  React.useEffect(() => {
    const groups = Array.from(new Set(products.map((p) => p.group).filter(Boolean)));
    setProductGroups(groups);
  }, [products]);

  const handleAddGroup = (groupName) => {
    if (groupName && !productGroups.includes(groupName)) {
      setProductGroups([...productGroups, groupName]);
      setNewGroupName("");
    }
  };

  const handleProductGroup = (product, group) => {
    dispatch(updateProduct({ id: product.id, updatedProduct: { ...product, group } }));
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div>
      {selectedProduct && (
        <ProductForm
          productToEdit={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <div className="mb-3">
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="New Group Name"
          className="me-2"
        />
        <Button onClick={() => handleAddGroup(newGroupName)}>Add Group</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <select
                  value={product.group || ""}
                  onChange={(e) => handleProductGroup(product, e.target.value)}
                >
                  <option value="">Select Group</option>
                  {productGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <Button onClick={() => handleEditProduct(product)}>Edit</Button>
                <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!selectedProduct && (
        <Button onClick={() => setSelectedProduct({})}>Add Product</Button>
      )}
    </div>
  );
};

export default ProductTab;
