import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import HomeScreen from "./components/screens/homescreen/homescreen";
import Productscreen from "./components/screens/productscreen/productscreen";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./components/screens/cart-screen/cart-screen";
import LoginScreen from "./components/screens/login-screen/login-screen";
import RegisterScreen from "./components/screens/register-screen/register-screen";
import ShippingScreen from "./components/screens/shipping-screen/shipping-screen";
import PrivateRoute from "./components/private-route/private-route";
import PaymentScreen from "./components/screens/payment-screen/payment-screen";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<Productscreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      {/* Protected Routes */}
      <Route path="" element={<PrivateRoute/>}>
      <Route path="/shipping" element={<ShippingScreen />} />
      <Route path="/payment" element={<PaymentScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
