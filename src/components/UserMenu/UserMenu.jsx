import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import styles from './UserMenu.module.css'; 

export const UserMenu = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.userMenuContainer}>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};