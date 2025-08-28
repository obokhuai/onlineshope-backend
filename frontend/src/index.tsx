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
import PlaceOrderScreen from "./components/screens/place-order-screen/place-order-screen";
import AdminRoute from "./components/admin-route/admin-route";
import OrderListScreen from "./components/screens/admin/order-list-screen/order-list-screen";
import ProductListScreen from "./components/screens/admin/product-list-screen/product-list-screen";
import OrderScreen from "./components/screens/order-screen/order-screen";
import ProductEditScreen from "./components/screens/admin/product-edit-screen/product-edit-screen";
import UserListScreen from "./components/screens/admin/user-list-screen/user-list-screen";
import UserEditScreen from "./components/screens/admin/user-edit-screen/user-edit-screen";
import { HelmetProvider } from 'react-helmet-async';
import ProfileScreen from "./components/screens/profile-screen/profile-screen";

const router = createBrowserRouter(
  createRoutesFromElements(
     <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route
        path='/search/:keyword/page/:pageNumber'
        element={<HomeScreen />}
      />
      <Route path='/product/:id' element={<Productscreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      {/* Admin users */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
       <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
      </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
