import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact({ name, number }));
    toast.success('Contact added successfully!');
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add Contact</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Add contact</button>
    </form>
  );
};

export default ContactForm;



