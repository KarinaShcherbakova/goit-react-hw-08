import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm'; 
import { login } from '../../redux/auth/operations';
import styles from './LoginPage.module.css'; 

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    console.log('Attempting login with credentials:', credentials);
    dispatch(login(credentials)) 
      .then((response) => {
        console.log('Login success:', response);
        navigate('/contacts'); 
      })
      .catch((error) => {
        console.error('Login failed:', error); 
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.formContainer}>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;