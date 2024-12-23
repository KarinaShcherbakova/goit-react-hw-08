import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export const PrivateRoute = ({ redirectTo = '/login' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn); 

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />; 
};

export default PrivateRoute;



