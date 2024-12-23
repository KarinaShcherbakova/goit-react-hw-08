import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css'; 

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, number });
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

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;