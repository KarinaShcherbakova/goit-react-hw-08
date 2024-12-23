import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { TextField, Button, Typography } from '@mui/material'; 
import styles from './LoginForm.module.css'; 

const LoginForm = ({ onLogin }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
    onLogin(values);
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <Typography variant="h4" className={styles.formTitle}>Login</Typography>
          
          <div className={styles.inputContainer}>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              as={TextField}
              fullWidth
              variant="outlined"
              className={styles.input}
              required
            />
            <ErrorMessage name="email" component="div" className={styles.errorMessage} />
          </div>

          <div className={styles.inputContainer}>
            <Field
              name="password"
              type="password"
              placeholder="Password"
              as={TextField}
              fullWidth
              variant="outlined"
              className={styles.input}
              required
            />
            <ErrorMessage name="password" component="div" className={styles.errorMessage} />
          </div>

          <Button type="submit" variant="contained" className={styles.submitButton}>
            Login
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;