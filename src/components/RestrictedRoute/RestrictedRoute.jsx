import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export const RestrictedRoute = ({ redirectTo = '/contacts' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn); 

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Outlet />; 
};

export default RestrictedRoute;


