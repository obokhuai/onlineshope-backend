import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./payment-screen.css";
import { RootState } from "../../../store";
import { savePaymentMethod } from "../../../slices/cart-slice";
import CheckoutSteps from "../../checkout-steps/checkout-steps";
import FormContainer from "../../form-container/form-container";

const PaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState<string>("PayPal");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <fieldset className="form-group">
          <legend className="form-legend">Select Method</legend>
          <div className="radio-group">
            <label htmlFor="PayPal" className="form-check-label">
              <input
                className="form-check-input my-2"
                type="radio"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              PayPal or Credit Card
            </label>
            {/* Add more payment methods if needed */}
          </div>
        </fieldset>
        <button type="submit" className="btn my-2">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
