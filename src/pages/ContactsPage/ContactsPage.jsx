import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact, addContact, editContact } from '../../redux/contacts/operations';
import { selectContacts, selectIsLoading, selectError } from '../../redux/contacts/selectors';
import { setFilter } from '../../redux/filters/slice';
import toast from 'react-hot-toast'; 
import styles from './ContactsPage.module.css'; 

const ContactForm = React.lazy(() => import('../../components/ContactForm/ContactForm'));
const ContactList = React.lazy(() => import('../../components/ContactList/ContactList'));
const SearchBox = React.lazy(() => import('../../components/SearchBox/SearchBox'));

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector((state) => state.filters.query);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    setSearchTerm(filter);
  }, [filter]);

  const handleSearchChange = (term) => {
    setSearchTerm(term); 
    dispatch(setFilter(term));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.number.includes(searchTerm) 
  );

  const handleDelete = (id) => {
    dispatch(deleteContact(id)); 
    toast.success("Contact deleted successfully!");
  };

  const handleAddContact = (newContact) => {
    dispatch(addContact(newContact)); 
    toast.success("Contact added successfully!");
  };

  const handleEditContact = (updatedContact) => {
    dispatch(editContact(updatedContact));
    toast.success("Contact updated successfully!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contacts</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ContactForm onSubmit={handleAddContact} />
        <div className={styles.searchBox}>
          <SearchBox value={searchTerm} onSearchChange={handleSearchChange} />
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.contactList}>
          <ContactList 
            contacts={filteredContacts} 
            onDelete={handleDelete} 
            onEdit={handleEditContact} 
          />
        </div>
      </Suspense>
    </div>
  );
};

export default ContactsPage;













