import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { EditContactForm } from '../EditContactForm/EditContactForm';
import styles from './ContactList.module.css'; 

const ContactList = ({ contacts, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact); 
    setIsModalOpen(true); 
  };

  const handleEditClick = (contact) => {
    setContactToEdit(contact); 
    setIsEditFormOpen(true);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      onDelete(contactToDelete.id); 
    }
    setIsModalOpen(false); 
    setContactToDelete(null); 
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false); 
    setContactToDelete(null); 
  };

  const handleEditContact = (updatedContact) => {
    onEdit(updatedContact); 
    setIsEditFormOpen(false); 
  };

  return (
    <div className={styles.contactList}>
      {contacts.length === 0 ? (
        <p className={styles.noContactsMessage}>No contacts available</p>  
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id} className={styles.contactItem}>
              <div>
                <div className={styles.contactInfo}>
                  <label>Name: </label>
                  <span>{contact.name}</span>
                </div>
                <div className={styles.contactInfo}>
                  <label>Phone Number: </label>
                  <span>{contact.number}</span>
                </div>
              </div>
              <div className={styles.contactActions}>
                <button onClick={() => handleEditClick(contact)}>Edit</button>
                <button onClick={() => handleDeleteClick(contact)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && (
        <Modal
          message={`Are you sure you want to delete ${contactToDelete?.name}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {isEditFormOpen && (
        <EditContactForm
          contact={contactToEdit}
          onSave={handleEditContact}
          onCancel={() => setIsEditFormOpen(false)}
        />
      )}
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ContactList;