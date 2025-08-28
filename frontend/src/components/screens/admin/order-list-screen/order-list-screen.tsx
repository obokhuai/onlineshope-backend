import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Message from '../../../message/message';
import Loader from '../../../spinner/spinner';
import { useGetOrdersQuery } from '../../../../slices/orders-api-slice';
import "./order-list-screen.css"

interface Order {
  _id: string;
  user?: {
    name: string;
  };
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
}

const OrderListScreen: React.FC = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery(1);

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {/* Assuming error is typed. If not, adjust accordingly */}
          {/* @ts-ignore */}
          {error?.data?.message || error.error || 'An error occurred'}
        </Message>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order:any) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid && order.paidAt ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered && order.deliveredAt ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Link className="btn btn-sm" to={`/order/${order._id}`}>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderListScreen;
