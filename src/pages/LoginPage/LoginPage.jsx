import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.formContainer}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;






