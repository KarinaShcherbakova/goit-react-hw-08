import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import styles from './RegistrationForm.module.css';

const RegistrationForm = ({ onRegister }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values) => {
    onRegister(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.formField}>
          <Field className={styles.input} type="text" name="name" placeholder="Name" required />
          <ErrorMessage name="name" component="div" className={styles.errorMessage} />
        </div>
        <div className={styles.formField}>
          <Field className={styles.input} type="email" name="email" placeholder="Email" required />
          <ErrorMessage name="email" component="div" className={styles.errorMessage} />
        </div>
        <div className={styles.formField}>
          <Field className={styles.input} type="password" name="password" placeholder="Password" required />
          <ErrorMessage name="password" component="div" className={styles.errorMessage} />
        </div>
        <div className={styles.formField}>
          <Field className={styles.input} type="password" name="confirmPassword" placeholder="Confirm Password" required />
          <ErrorMessage name="confirmPassword" component="div" className={styles.errorMessage} />
        </div>
        <button type="submit" className={styles.submitButton}>Register</button>
      </Form>
    </Formik>
  );
};

RegistrationForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegistrationForm;