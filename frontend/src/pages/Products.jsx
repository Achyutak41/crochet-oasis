import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";

function Products() {
  const { products } = useProducts();
  return (
    <main className="products-page">

      <section className="products-header">
        <p>OUR COLLECTION</p>

        <h1>Handmade Crochet Products</h1>

        <span>
          Discover unique handmade products crafted with
          care and creativity.
        </span>
      </section>

      <section className="products-section">

        <div className="products-grid">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </section>

    </main>
  );
}

export default Products;