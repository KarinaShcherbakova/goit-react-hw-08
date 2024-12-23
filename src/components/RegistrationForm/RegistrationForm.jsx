import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(register(values))
      .unwrap() 
      .then(() => {
        toast.success('Registration successful!');
        navigate('/contacts');
      })
      .catch((error) => {
        toast.error('Registration failed. Please try again.');
        console.error('Registration error:', error);
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
            <div className={styles.formField}>
              <Field
                className={styles.input}
                type="text"
                name="name"
                placeholder="Name"
                required
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.formField}>
              <Field
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.formField}>
              <Field
                className={styles.input}
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.formField}>
              <Field
                className={styles.input}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;