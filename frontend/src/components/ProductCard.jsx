import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-info">

        <h3>{product.name}</h3>

        <p className="product-category">
          {product.category}
        </p>

        <p className="product-price">
          ₹{product.price}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="product-button"
        >
          View Product
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;