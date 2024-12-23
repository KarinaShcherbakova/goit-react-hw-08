import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import styles from './ContactsPage.module.css';

const ContactForm = React.lazy(() => import('../../components/ContactForm/ContactForm'));
const ContactList = React.lazy(() => import('../../components/ContactList/ContactList'));
const SearchBox = React.lazy(() => import('../../components/SearchBox/SearchBox'));

const ContactsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contacts</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ContactForm />
        <div className={styles.searchBox}>
          <SearchBox />
        </div>
        <ContactList />
      </Suspense>
    </div>
  );
};

export default ContactsPage;






















