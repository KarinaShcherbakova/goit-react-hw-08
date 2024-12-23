import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { refreshUser } from './redux/auth/operations';
import { selectIsRefreshing, selectUserEmail } from './redux/auth/selectors';
import { Layout } from './components/Layout/Layout';
import { RestrictedRoute } from './components/RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import styles from './App.module.css';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = React.lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = React.lazy(() => import('./pages/ContactsPage/ContactsPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const userEmail = useSelector(selectUserEmail);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <Layout>
      {userEmail && (
        <div className={styles.welcomeMessage}>
          <h2>Welcome, {userEmail}!</h2>
        </div>
      )}
      <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RestrictedRoute />}>
            <Route index element={<RegistrationPage />} />
          </Route>
          <Route path="/login" element={<RestrictedRoute />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="/contacts" element={<PrivateRoute />}>
            <Route index element={<ContactsPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </Layout>
  );
}

export default App;








