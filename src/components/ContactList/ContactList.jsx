import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteContact, editContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import toast from 'react-hot-toast';
import Modal from '../Modal/Modal';
import { EditContactForm } from '../EditContactForm/EditContactForm';
import styles from './ContactList.module.css'; 

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector((state) => state.filters.query);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  const handleDelete = (contact) => {
    setIsModalOpen(true);
    setContactToDelete(contact);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete.id));
      toast.success('Contact deleted successfully!');
    }
    setIsModalOpen(false);
  };

  const handleEdit = (contact) => {
    setContactToEdit(contact);
    setIsEditFormOpen(true);
  };

  const saveEdit = (updatedContact) => {
    dispatch(editContact(updatedContact));
    toast.success('Contact updated successfully!');
    setIsEditFormOpen(false);
  };

  return (
    <div>
      <ul className={styles.contactList}>
        {filteredContacts.map((contact) => (
          <li key={contact.id} className={styles.contactItem}>
            <p className={styles.contactInfo}>
              {contact.name}: {contact.number}
            </p>
            <div className={styles.contactActions}>
              <button
                className={styles.button}
                onClick={() => handleEdit(contact)}
              >
                Edit
              </button>
              <button
                className={styles.button}
                onClick={() => handleDelete(contact)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {filteredContacts.length === 0 && (
        <p className={styles.noContactsMessage}>No contacts found!</p>
      )}

      {isModalOpen && (
        <Modal
          message={`Are you sure you want to delete "${contactToDelete?.name}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {isEditFormOpen && contactToEdit && (
        <EditContactForm
          contact={contactToEdit}
          onSave={saveEdit}
          onCancel={() => setIsEditFormOpen(false)}
        />
      )}
    </div>
  );
};

export default ContactList;

