// ShippingScreen.tsx
import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./shipping-screen.css";
import FormContainer from "../../form-container/form-container";
import { saveShippingAddress } from "../../../slices/cart-slice";
import { RootState } from "../../../store";
import CheckoutSteps from "../../checkout-steps/checkout-steps";

const ShippingScreen: React.FC = () => {
  const { shippingAddress } = useSelector((state: RootState) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group my-2">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary my-3">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
