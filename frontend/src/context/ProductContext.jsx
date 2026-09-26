import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

const ProductContext = createContext();

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================================================
  // Get Admin JWT Token
  // =========================================================
  const getAdminToken = () => {
    return localStorage.getItem("crochetOasisAdminToken");
  };

  // =========================================================
  // Fetch Products
  // =========================================================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/`);

      setProducts(response.data);
    } catch (err) {
      console.error(
        "Failed to fetch products:",
        err.response?.data || err
      );

      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // Load Products When App Starts
  // =========================================================
  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================================================
  // Add Product
  // =========================================================
  const addProduct = async (productData) => {
    try {
      const token = getAdminToken();

      const response = await axios.post(
        `${API_URL}/`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((currentProducts) => [
        ...currentProducts,
        response.data,
      ]);

      return response.data;
    } catch (err) {
      console.error(
        "Failed to add product:",
        err.response?.data || err
      );

      throw err;
    }
  };

  // =========================================================
  // Update Product
  // =========================================================
  const updateProduct = async (
    productId,
    productData
  ) => {
    try {
      const token = getAdminToken();

      const response = await axios.put(
        `${API_URL}/${productId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      console.error(
        "Failed to update product:",
        err.response?.data || err
      );

      throw err;
    }
  };

  // =========================================================
  // Delete Product
  // =========================================================
  const deleteProduct = async (productId) => {
    try {
      const token = getAdminToken();

      await axios.delete(
        `${API_URL}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== productId
        )
      );
    } catch (err) {
      console.error(
        "Failed to delete product:",
        err.response?.data || err
      );

      throw err;
    }
  };

  // =========================================================
  // Context Provider
  // =========================================================
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

// =========================================================
// Custom Hook
// =========================================================
export function useProducts() {
  return useContext(ProductContext);
}