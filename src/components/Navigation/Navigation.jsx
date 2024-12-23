import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

export const Navigation = () => (
  <nav className={styles.nav}>
    <Link to="/" className={styles.linkButton}>Home</Link>
    <Link to="/contacts" className={styles.linkButton}>Contacts</Link>
  </nav>
);