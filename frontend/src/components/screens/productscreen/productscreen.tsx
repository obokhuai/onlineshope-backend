import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetProductDetailsQuery } from "../../../slices/product-slice";
import { addToCart } from "../../../slices/cart-slice"; 
import Rating from "../../rating/rating";
import Message from "../../message/message";
import Loader from "../../spinner/spinner";
import "./productscreen.css"

const ProductScreen: React.FC = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, qty })); 
    navigate("/cart");
  };

  return (
    <div className="product-screen">
      <Link to="/" className="back-btn">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {(error as any)?.data?.message ||
            (error as any)?.error ||
            "An error occurred"}
        </Message>
      ) : (
        product && (
          <div className="product-details-grid">
            <div className="product-image-col">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-info-col">
              <div className="product-info-list">
                <h3>{product.name}</h3>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                <div>Price: <span className="price">${product.price}</span></div>
                <div>Description: {product.description}</div>
              </div>
            </div>
            <div className="product-action-col">
              <div className="product-action-card">
                <div>Price: <strong>${product.price}</strong></div>
                <div>Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}</div>
                {product.countInStock > 0 && (
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-half">Qty</div>
                      <div className="col-half">
                        <select
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {Array.from({ length: product.countInStock }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </li>
                )}
                <button
                  type="button"
                  className="add-to-cart-btn"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductScreen;
