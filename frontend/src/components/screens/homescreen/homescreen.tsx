import React, { useEffect, useState } from "react";
import Product from "../../product/product";
import "./homescreen.css";
import { ProductType } from "../../../../src/components/types/products";

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  console.log("object", products);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-screen">
      <h1>Latest Products</h1>
      <div className="product-grid">
        {products.map((product: ProductType) => (
          <div className="product-grid-item" key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
