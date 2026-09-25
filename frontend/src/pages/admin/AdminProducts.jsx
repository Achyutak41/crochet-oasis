import { useMemo, useState } from "react";

import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

import { useProducts } from "../../context/ProductContext";


function AdminProducts() {

  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();


  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");


  const [showForm, setShowForm] =
    useState(false);


  const [editingProduct, setEditingProduct] =
    useState(null);


  const [productForm, setProductForm] = useState({
    name: "",
    category: "Home Decor",
    price: "",
    image: "",
    description: "",
  });


  const categories = [
    "All",
    "Home Decor",
    "Accessories",
    "Gifts",
  ];


  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const searchText =
        search.toLowerCase();


      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchText);


      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;


      return (
        matchesSearch &&
        matchesCategory
      );

    });

  }, [
    products,
    search,
    categoryFilter,
  ]);


  const openAddForm = () => {

    setEditingProduct(null);

    setProductForm({
      name: "",
      category: "Home Decor",
      price: "",
      image: "",
      description: "",
    });

    setShowForm(true);

  };


  const openEditForm = (product) => {

    setEditingProduct(product);

    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description:
        product.description || "",
    });

    setShowForm(true);

  };


  const closeForm = () => {

    setShowForm(false);

    setEditingProduct(null);

  };


  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setProductForm((current) => ({
      ...current,
      [name]: value,
    }));

  };


  const handleSubmit = async (event) => {
  event.preventDefault();

  const productData = {
    name: productForm.name.trim(),
    category: productForm.category,
    price: Number(productForm.price),
    image: productForm.image.trim(),
    description: productForm.description.trim(),
  };

  try {
    if (editingProduct) {
      await updateProduct(
        editingProduct.id,
        productData
      );
    } else {
      await addProduct(productData);
    }

    closeForm();
  } catch (error) {
    console.error("Product save failed:", error);

    alert(
      "Unable to save the product. Please check that the backend is running."
    );
  }
};


  const handleDelete = (product) => {

    const confirmed = window.confirm(
      `Delete "${product.name}"?`
    );


    if (!confirmed) {
      return;
    }


    deleteProduct(product.id);

  };


  return (
    <div className="admin-page">

      <AdminSidebar />


      <div className="admin-main">

        <AdminNavbar />


        <main className="admin-content">

          {/* Header */}

          <div className="admin-products-header">

            <div>

              <p className="admin-section-tag">
                PRODUCT MANAGEMENT
              </p>

              <h1>
                Products
              </h1>

              <p>
                Manage the products available
                in your Crochet Oasis store.
              </p>

            </div>


            <button
              type="button"
              className="admin-add-product-button"
              onClick={openAddForm}
            >
              + Add Product
            </button>

          </div>


          {/* Search + Filter */}

          <section className="admin-product-controls">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="admin-search-input"
            />


            <div className="admin-filter-buttons">

              {categories.map((category) => (

                <button
                  key={category}
                  type="button"
                  className={
                    categoryFilter === category
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCategoryFilter(category)
                  }
                >
                  {category}
                </button>

              ))}

            </div>

          </section>


          {/* Products */}

          {filteredProducts.length === 0 ? (

            <div className="admin-empty-state">

              <div>
                🧶
              </div>

              <h3>
                No products found
              </h3>

              <p>
                Try another search or add
                a new product.
              </p>

            </div>

          ) : (

            <section className="admin-products-grid">

              {filteredProducts.map(
                (product) => (

                  <article
                    className="admin-product-card"
                    key={product.id}
                  >

                    <div className="admin-product-image">

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    </div>


                    <div className="admin-product-info">

                      <span className="admin-product-category">
                        {product.category}
                      </span>

                      <h3>
                        {product.name}
                      </h3>

                      <strong>
                        ₹{product.price.toLocaleString("en-IN")}
                      </strong>

                      {product.description && (

                        <p>
                          {product.description}
                        </p>

                      )}


                      <div className="admin-product-actions">

                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(product)
                          }
                          className="admin-edit-button"
                        >
                          Edit
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(product)
                          }
                          className="admin-delete-button"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </article>

                )
              )}

            </section>

          )}

        </main>

      </div>


      {/* Add/Edit Modal */}

      {showForm && (

        <div
          className="admin-modal-overlay"
          onClick={closeForm}
        >

          <div
            className="admin-product-form-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="admin-modal-header">

              <div>

                <p className="admin-section-tag">
                  {editingProduct
                    ? "EDIT PRODUCT"
                    : "NEW PRODUCT"}
                </p>

                <h2>
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

              </div>


              <button
                type="button"
                className="admin-modal-close"
                onClick={closeForm}
              >
                ×
              </button>

            </div>


            <form
              className="admin-product-form"
              onSubmit={handleSubmit}
            >

              <div className="admin-form-group">

                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleChange}
                  placeholder="Example: Crochet Rose"
                  required
                />

              </div>


              <div className="admin-form-row">

                <div className="admin-form-group">

                  <label>
                    Category
                  </label>

                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleChange}
                  >

                    <option value="Home Decor">
                      Home Decor
                    </option>

                    <option value="Accessories">
                      Accessories
                    </option>

                    <option value="Gifts">
                      Gifts
                    </option>

                  </select>

                </div>


                <div className="admin-form-group">

                  <label>
                    Price (₹)
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={productForm.price}
                    onChange={handleChange}
                    placeholder="799"
                    min="0"
                    required
                  />

                </div>

              </div>


              <div className="admin-form-group">

                <label>
                  Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={productForm.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                />

              </div>


              <div className="admin-form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleChange}
                  placeholder="Describe the product..."
                  rows="4"
                />

              </div>


              <div className="admin-form-actions">

                <button
                  type="button"
                  className="admin-cancel-button"
                  onClick={closeForm}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="admin-save-button"
                >
                  {editingProduct
                    ? "Save Changes"
                    : "Add Product"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminProducts;