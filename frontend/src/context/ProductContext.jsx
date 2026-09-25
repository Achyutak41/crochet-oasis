import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/`);

      setProducts(response.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Load products when app starts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const addProduct = async (productData) => {
    try {
      const response = await axios.post(
        `${API_URL}/`,
        productData
      );

      setProducts((currentProducts) => [
        ...currentProducts,
        response.data,
      ]);

      return response.data;
    } catch (err) {
      console.error("Failed to add product:", err);
      throw err;
    }
  };

  // Update product
  const updateProduct = async (productId, productData) => {
    try {
      const response = await axios.put(
        `${API_URL}/${productId}`,
        productData
      );

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId
            ? response.data
            : product
        )
      );

      return response.data;
    } catch (err) {
      console.error("Failed to update product:", err);
      throw err;
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `${API_URL}/${productId}`
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== productId
        )
      );
    } catch (err) {
      console.error("Failed to delete product:", err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}