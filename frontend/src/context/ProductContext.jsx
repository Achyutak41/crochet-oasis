import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import initialProducts from "../data/products";

const ProductContext = createContext();

export function ProductProvider({ children }) {

  const [products, setProducts] = useState(() => {

    const savedProducts =
      localStorage.getItem("crochetOasisProducts");

    return savedProducts
      ? JSON.parse(savedProducts)
      : initialProducts;

  });


  useEffect(() => {

    localStorage.setItem(
      "crochetOasisProducts",
      JSON.stringify(products)
    );

  }, [products]);


  const addProduct = (productData) => {

    const newProduct = {

      id: `product-${Date.now()}`,

      ...productData,

    };

    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct,
    ]);

    return newProduct;
  };


  const updateProduct = (
    productId,
    productData
  ) => {

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              ...productData,
            }
          : product
      )
    );

  };


  const deleteProduct = (productId) => {

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== productId
      )
    );

  };


  return (
    <ProductContext.Provider
      value={{
        products,
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