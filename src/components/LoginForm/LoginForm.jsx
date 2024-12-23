import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography } from '@mui/material';
import { login } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(login(values))
      .unwrap() 
      .then(() => {
        toast.success('Login successful!');
        navigate('/contacts');
      })
      .catch((error) => {
        toast.error('Login failed. Please check your credentials.');
        console.error('Login error:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <Typography variant="h4" className={styles.formTitle}>
              Login
            </Typography>

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
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
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
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;




