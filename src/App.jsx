import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { refreshUser } from './redux/auth/operations';
import { selectIsLoggedIn, selectIsRefreshing, selectUserEmail } from './redux/auth/selectors'; 
import { Layout } from './components/Layout/Layout';
import { persistor } from './redux/store';
import { Suspense } from 'react';
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
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const userEmail = useSelector(selectUserEmail); 

  const [email, setEmail] = useState(null);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      setEmail(userEmail);
    } else {
      setEmail(null);
    }
  }, [isLoggedIn, userEmail]);

  if (isRefreshing) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <PersistGate loading={<div className={styles.loading}>Loading...</div>} persistor={persistor}>
      <Layout>
        {email && (
          <div className={styles.welcomeMessage}>
            <h2>Welcome, {email}!</h2>
          </div>
        )}
        <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={<RestrictedRoute isLoggedIn={isLoggedIn}><RegistrationPage /></RestrictedRoute>}
            />
            <Route
              path="/login"
              element={<RestrictedRoute isLoggedIn={isLoggedIn}><LoginPage /></RestrictedRoute>}
            />
            <Route
              path="/contacts"
              element={<PrivateRoute isLoggedIn={isLoggedIn}><ContactsPage /></PrivateRoute>}
            />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster position="top-right" />
    </PersistGate>
  );
}

export default App;








