import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import Message from '../components/Message';
// import Loader from '../components/Loader';
// import {
//   useDeliverOrderMutation,
//   useGetOrderDetailsQuery,
//   useGetPaypalClientIdQuery,
//   usePayOrderMutation,
// } from '../slices/ordersApiSlice';
import Message from '../../message/message';
import Loader from '../../spinner/spinner';
import { useGetOrderDetailsQuery } from '../../../slices/orders-api-slice';
import "./order-screen.css"


interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface User {
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface Order {
  _id: string;
  user: User;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
}

const OrderScreen: React.FC = () => {
  const { id: orderId } = useParams<{ id: string }>();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  // const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  // const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const { userInfo } = useSelector((state: any) => state.auth);



  // const {
  //   data: paypal,
  //   isLoading: loadingPayPal,
  //   error: errorPayPal,
  // } = useGetPaypalClientIdQuery();

  // useEffect(() => {
  //   if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
  //     const loadPaypalScript = async () => {
  //       paypalDispatch({
  //         type: 'resetOptions',
  //         value: {
  //           'client-id': paypal.clientId,
  //           currency: 'USD',
  //         },
  //       });
  //       paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
  //     };
  //     if (order && !order.isPaid) {
  //       if (!(window as any).paypal) {
  //         loadPaypalScript();
  //       }
  //     }
  //   }
  // }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  // const onApprove = (data: any, actions: any) => {
  //   return actions.order.capture().then(async (details: any) => {
  //     try {
  //       await payOrder({ orderId, details });
  //       refetch();
  //       toast.success('Order is paid');
  //     } catch (err: any) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   });
  // };

  const onError = (err: any) => {
    toast.error(err.message);
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order!.totalPrice.toString() },
          },
        ],
      })
      .then((orderID: string) => orderID);
  };

  // const deliverHandler = async () => {
  //   await deliverOrder(orderId);
  //   refetch();
  // };

  if (isLoading) return <Loader />;
  if (error)
    return <Message variant="danger">{(error as any)?.data?.message || 'Error'}</Message>;

  return (
    <>
      <h1>Order {order!._id}</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="list-group flush">
            <div className="list-group-item">
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order!.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order!.user.email}`}>{order!.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order!.shippingAddress.address},{' '}
                {order!.shippingAddress.city} {order!.shippingAddress.postalCode},{' '}
                {order!.shippingAddress.country}
              </p>
              {order!.isDelivered ? (
                <Message variant="success">Delivered on {order!.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </div>

            <div className="list-group-item">
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order!.paymentMethod}
              </p>
              {order!.isPaid ? (
                <Message variant="success">Paid on {order!.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </div>

            <div className="list-group-item">
              <h2>Order Items</h2>
              {order!.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <div className="list-group flush">
                  {order!.orderItems.map((item:any, index:any) => (
                    <div key={index} className="list-group-item">
                      <div className="row">
                        <div className="col-md-1">
                          <img src={item.image} alt={item.name} className="img-fluid rounded" />
                        </div>
                        <div className="col">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        <div className="col-md-4">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="list-group flush">
              <div className="list-group-item">
                <h2>Order Summary</h2>
              </div>
              <div className="list-group-item">
                <div className="row">
                  <div className="col">Items</div>
                  <div className="col">${order!.itemsPrice}</div>
                </div>
              </div>
              <div className="list-group-item">
                <div className="row">
                  <div className="col">Shipping</div>
                  <div className="col">${order!.shippingPrice}</div>
                </div>
              </div>
              <div className="list-group-item">
                <div className="row">
                  <div className="col">Tax</div>
                  <div className="col">${order!.taxPrice}</div>
                </div>
              </div>
              <div className="list-group-item">
                <div className="row">
                  <div className="col">Total</div>
                  <div className="col">${order!.totalPrice}</div>
                </div>
              </div>
              {!order!.isPaid && (
                <div className="list-group-item">
                  {/* {loadingPay && <Loader />} */}

                 
                </div>
              )}

             {/* {loadingDeliver && <Loader />} */}

              {userInfo &&
                userInfo.isAdmin &&
                order!.isPaid &&
                !order!.isDelivered && (
                  <div className="list-group-item">
                    <button className="btn btn-block" >
                      Mark As Delivered
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
