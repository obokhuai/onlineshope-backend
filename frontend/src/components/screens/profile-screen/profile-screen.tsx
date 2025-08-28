import React, { useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// import Message from '../components/Message';
// import Loader from '../components/Loader';
// import { useProfileMutation } from '../slices/usersApiSlice';
// import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
// import { setCredentials } from '../slices/authSlice';
import './profile-screen.css';
import Message from '../../message/message';
import Loader from '../../spinner/spinner';
import { useProfileMutation } from '../../../slices/users-api-slice';
import { useGetMyOrdersQuery } from '../../../slices/orders-api-slice';
import { setCredentials } from '../../../slices/auth-slice';

interface RootState {
  auth: {
    userInfo: {
      name: string;
      email: string;
      _id: string;
    };
  };
}

interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
}

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery(1);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err: any) {
        toast.error(err?.data?.message || err.error || 'Failed to update profile');
      }
    }
  };

  return (
    <div className="profile-screen-container">
      <div className="profile-form-container">
        <h2>User Profile</h2>
        <form onSubmit={submitHandler} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loadingUpdateProfile}>
            Update
          </button>
          {loadingUpdateProfile && <Loader />}
        </form>
      </div>

      <div className="orders-container">
        <h2>My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {(error as any)?.data?.message || (error as any).error || 'Failed to fetch orders'}
          </Message>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: Order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt?.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt?.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`} className="btn-light btn-sm">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
