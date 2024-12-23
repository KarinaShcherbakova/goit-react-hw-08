import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography } from '@mui/material';
import styles from './EditContactForm.module.css';

export const EditContactForm = ({ contact, onSave, onCancel }) => {
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...contact, name, number }); 
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <Typography variant="h5" className={styles.formTitle}>
        Edit Contact
      </Typography>
      <div className={styles.inputContainer}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" color="primary" type="submit" className={styles.saveButton}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

EditContactForm.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};