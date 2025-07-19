import React from "react";
import { Link } from "react-router-dom";
import Rating from "../rating/rating";
import "./product.css";
import { ProductType } from "../types/products";

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img className="product-img" src={product.image} alt={product.name} />
      </Link>

      <div className="product-body">
        <Link to={`/product/${product._id}`}>
          <div className="product-title">
            <strong>{product.name}</strong>
          </div>
        </Link>

        <div className="product-rating">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>

        <div className="product-price">${product.price}</div>
      </div>
    </div>
  );
};

export default Product;
