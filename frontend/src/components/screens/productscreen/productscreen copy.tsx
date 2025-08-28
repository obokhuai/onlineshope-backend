import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './productscreen.css';
import { useCreateReviewMutation, useGetProductDetailsQuery } from '../../../slices/product-slice';
import Rating from '../../rating/rating';
import Loader from '../../spinner/spinner';
import Message from '../../message/message';
import { addToCart } from '../../../slices/cart-slice';
import { ExtendedProductType } from '../../types/products';

const ProductScreen: React.FC = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId) as {
    data?: ExtendedProductType;
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  const { userInfo } = useSelector((state: any) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty }));
      navigate('/cart');
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
      setRating(0);
      setComment('');
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link className="btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {(error as any)?.data?.message || (error as any)?.error || 'An error occurred'}
        </Message>
      ) : product ? (
        <>
          <div className="row">
            <div className="col-6">
              <img src={product.image} alt={product.name} className="img-fluid" />
            </div>
            <div className="col-3">
              <ul className="list-group flush">
                <li className="list-group-item">
                  <h3>{product.name}</h3>
                </li>
                <li className="list-group-item">
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </li>
                <li className="list-group-item">Price: ${product.price}</li>
                <li className="list-group-item">Description: {product.description}</li>
              </ul>
            </div>
            <div className="col-3">
              <div className="card">
                <ul className="list-group flush">
                  <li className="list-group-item row">
                    <span>Price:</span>
                    <span><strong>${product.price}</strong></span>
                  </li>
                  <li className="list-group-item row">
                    <span>Status:</span>
                    <span>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</span>
                  </li>
                  {product.countInStock > 0 && (
                    <li className="list-group-item row">
                      <span>Qty</span>
                      <select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="form-control-select"
                      >
                        {Array.from({ length: product.countInStock }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </li>
                  )}
                  <li className="list-group-item">
                    <button
                      className="btn btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="review-row">
            <div className="col-6">
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ul className="list-group flush">
                {product.reviews.map((review) => (
                  <li key={review._id} className="list-group-item">
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
                <li className="list-group-item">
                  <h2>Write a Customer Review</h2>
                  {loadingProductReview && <Loader />}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <select
                          id="rating"
                          className="form-control-select"
                          required
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>
                      <div className="form-group my-2">
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          id="comment"
                          rows={3}
                          className="form-control-textarea"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        disabled={loadingProductReview}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ProductScreen;
