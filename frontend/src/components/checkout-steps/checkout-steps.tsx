import React from 'react';
import { Link } from 'react-router-dom';
import './checkout-steps.css';

interface CheckoutStepsProps {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  step1,
  step2,
  step3,
  step4,
}) => (
  <ul className="checkout-steps">
    <li className="checkout-step">
      {step1 ? (
        <Link className="checkout-link" to="/login">Sign In</Link>
      ) : (
        <span className="checkout-link checkout-link--disabled">Sign In</span>
      )}
    </li>
    <li className="checkout-step">
      {step2 ? (
        <Link className="checkout-link" to="/shipping">Shipping</Link>
      ) : (
        <span className="checkout-link checkout-link--disabled">Shipping</span>
      )}
    </li>
    <li className="checkout-step">
      {step3 ? (
        <Link className="checkout-link" to="/payment">Payment</Link>
      ) : (
        <span className="checkout-link checkout-link--disabled">Payment</span>
      )}
    </li>
    <li className="checkout-step">
      {step4 ? (
        <Link className="checkout-link" to="/placeorder">Place Order</Link>
      ) : (
        <span className="checkout-link checkout-link--disabled">Place Order</span>
      )}
    </li>
  </ul>
);

export default CheckoutSteps;
