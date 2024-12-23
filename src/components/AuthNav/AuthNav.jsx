import { Link } from 'react-router-dom';
import styles from './AuthNav.module.css'; 

export const AuthNav = () => (
  <nav className={styles.nav}>
    <Link to="/register" className={styles.link}>
      Register
    </Link>
    <Link to="/login" className={styles.link}>
      Login
    </Link>
  </nav>
);