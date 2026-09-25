import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="product-not-found">

        <h1>
          Product Not Found
        </h1>

        <p>
          Sorry, we couldn't find the product
          you're looking for.
        </p>

        <Link
          to="/products"
          className="product-button"
        >
          Back to Products
        </Link>

      </main>
    );
  }

  const handleIncrease = () => {
    setQuantity((currentQuantity) =>
      currentQuantity + 1
    );
  };

  const handleDecrease = () => {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1)
    );
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);

    alert(
      `${product.name} added to cart!`
    );
  };

  return (
    <main className="product-details-page">

      <div className="product-details-container">

        {/* Product Image */}

        <div className="product-details-image">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>


        {/* Product Information */}

        <div className="product-details-info">

          <p className="product-details-category">
            {product.category}
          </p>

          <h1>
            {product.name}
          </h1>

          <p className="product-details-price">
            ₹{product.price}
          </p>

          <p className="product-details-description">
            This beautiful handmade crochet product
            is carefully crafted with attention to
            detail. Each piece is unique and made
            with care.
          </p>


          {/* Quantity */}

          <div className="quantity-section">

            <label>
              Quantity
            </label>

            <div className="quantity-control">

              <button
                onClick={handleDecrease}
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
              >
                +
              </button>

            </div>

          </div>


          {/* Actions */}

          <div className="product-actions">

            <button
              className="add-cart-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <Link
              to="/products"
              className="continue-shopping-button"
            >
              Continue Shopping
            </Link>

          </div>


          {/* Product Information */}

          <div className="product-extra-info">

            <div>

              <strong>
                Handmade
              </strong>

              <span>
                Carefully crafted by hand
              </span>

            </div>

            <div>

              <strong>
                Made to Order
              </strong>

              <span>
                Custom options available
              </span>

            </div>

            <div>

              <strong>
                Care Instructions
              </strong>

              <span>
                Handle with care and keep dry
              </span>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;