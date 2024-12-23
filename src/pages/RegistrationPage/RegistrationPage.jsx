import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registration</h1>
      <div className={styles.formContainer}>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;



