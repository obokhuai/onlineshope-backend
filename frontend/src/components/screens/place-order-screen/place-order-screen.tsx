import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../message/message";
import CheckoutSteps from "../../checkout-steps/checkout-steps";
import Loader from "../../spinner/spinner";
import { useCreateOrderMutation } from "../../../slices/orders-api-slice";
import { clearCartItems } from "../../../slices/cart-slice";
import { RootState } from "../../../store";
import "./place-order-screen.css";
//import { CartItem } from '../../../slices/cart-slice';

const PlaceOrderScreen: React.FC = () => {
  const navigate = useNavigate();
  const cart: any = useSelector((state: RootState) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Order error");
    }
  };

  return (
    <div className="place-order-screen">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="main-content">
        <div className="order-details">
          <section className="box">
            <h2>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </section>

          <section className="box">
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </section>

          <section className="box">
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ul className="order-items-list">
                {cart.cartItems.map((item: any, index: any) => (
                  <li key={index} className="order-item-row">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} className="thumb" />
                    </div>
                    <div className="item-name">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="item-info">
                      {item.qty} x ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
        <div className="order-summary">
          <div className="summary-card box">
            <h2>Order Summary</h2>
            <ul>
              <li className="summary-row">
                <span>Items</span>
                <span>${Number(cart.itemsPrice).toFixed(2)}</span>
              </li>
              <li className="summary-row">
                <span>Shipping</span>
                <span>${Number(cart.shippingPrice).toFixed(2)}</span>
              </li>
              <li className="summary-row">
                <span>Tax</span>
                <span>${Number(cart.taxPrice).toFixed(2)}</span>
              </li>
              <li className="summary-row">
                <span>Total</span>
                <span>${Number(cart.totalPrice).toFixed(2)}</span>
              </li>
              {error && (
                <li>
                  <Message variant="danger">
                    {(error as any)?.data?.message || "Order error"}
                  </Message>
                </li>
              )}
              <li>
                <button
                  type="button"
                  className="btn btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
                {isLoading && <Loader />}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
