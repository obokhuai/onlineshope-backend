import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'; // Adjust the path based on your project structure

const AdminRoute: React.FC = () => {
  // Select userInfo from Redux state with RootState typing
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
