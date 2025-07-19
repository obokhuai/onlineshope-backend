import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../../../slices/cart-slice";
import Message from "../../message/message";
import "./cart-screen.css";
import { ProductType } from "../../types/products";
import { CartItem } from "../../../slices/cart-slice";
import { RootState } from "../../../store";

const CartScreen = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state: RootState) => state.cart);

  console.log("cartItems", cartItems);

  const addToCartHandler = (product: ProductType, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

 const checkoutHandler = () => {
  if (userInfo) {
    // User is already logged in, go straight to checkout!
    navigate("/shipping");
  } else {
    // User not logged in, send to login page and remember where they're headed
    navigate("/login?redirect=/shipping");
  }
};


  return (
    <div className="cart-row">
      <div className="cart-col cart-col-main">
        <h1 className="cart-title">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ul className="cart-list">
            {cartItems.map((item: CartItem) => {
              console.log("cartttttt", item);
              return (
                <div>
                  (
                  <li className="cart-list-item" key={item._id}>
                    <div className="cart-item-row">
                      <div className="cart-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-name">
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </div>
                      <div className="cart-item-price">${item.price}</div>
                      <div className="cart-item-qty">
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {Array.from({ length: item.countInStock }, (_, x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="cart-item-remove">
                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </li>
                  )
                </div>
              );
            })}
          </ul>
        )}
      </div>
      <div className="cart-col cart-col-summary">
        <div className="cart-summary-card">
          <ul className="cart-list">
            <li className="cart-list-item">
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </li>
            <li className="cart-list-item">
              <button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
