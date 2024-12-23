import { AppBar } from '../AppBar/AppBar';
import { Container, CssBaseline } from '@mui/material'; 
import styles from './Layout.module.css'; 

export const Layout = ({ children }) => (
  <div className={styles.layoutContainer}>
    <CssBaseline /> 
    <AppBar /> 
    <Container className={styles.mainContent}>
      <main>{children}</main>
    </Container>
  </div>
);