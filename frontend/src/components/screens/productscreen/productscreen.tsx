import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import Rating from '../../../../src/components/rating/rating';
import './productscreen.css';
import { ProductType } from "../../../../src/components/types/products";

const ProductScreen: React.FC = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const { id: productId } = useParams<{ id: string }>();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json()
        setProduct(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct();
  }, [productId]);

  // if (!product) {
  //   return <div className="product-not-found">Product not found.</div>;
  // }

  return (
    <div className="product-screen">
      <Link to="/" className="back-btn">
        Go Back
      </Link>
      <div className="product-details-grid">
        <div className="product-image-col">
          <img src={product?.image} alt={product?.name} className="product-image" />
        </div>
        <div className="product-info-col">
          <div className="product-info-list">
            <div className="product-info-item">
              <h3>{product?.name}</h3>
            </div>
            <div className="product-info-item">
              <Rating value={product?.rating ?? 0} text={`${product?.numReviews ?? 0} reviews`} />
            </div>
            <div className="product-info-item">
              Price: <span className="price">${product?.price}</span>
            </div>
            <div className="product-info-item">
              Description: {product?.description}
            </div>
          </div>
        </div>
        <div className="product-action-col">
          <div className="product-action-card">
            <div className="product-action-list">
              <div className="product-action-item">
                <div className="row">
                  <div>Price:</div>
                  <div>
                    <strong>${product?.price}</strong>
                  </div>
                </div>
              </div>
              <div className="product-action-item">
                <div className="row">
                  <div>Status:</div>
                  <div>
                    {product && product?.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </div>
                </div>
              </div>
              <div className="product-action-item">
                <button
                  className="add-to-cart-btn"
                  type="button"
                  disabled={product?.countInStock === 0}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
