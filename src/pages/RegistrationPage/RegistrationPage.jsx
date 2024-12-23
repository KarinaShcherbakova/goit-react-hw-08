import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { register } from '../../redux/auth/operations';
import styles from './RegistrationPage.module.css'; 

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (userData) => {
    dispatch(register(userData))
      .then(() => {
        navigate('/contacts'); 
      })
      .catch((error) => {
        console.error('Registration failed:', error); 
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registration</h1>
      <div className={styles.formContainer}>
        <RegistrationForm onRegister={handleRegister} />
      </div>
    </div>
  );
};

export default RegistrationPage;