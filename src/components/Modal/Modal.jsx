import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'; 
import styles from './Modal.module.css';

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <Dialog open={true} onClose={onCancel} className={styles.modal}>
      <DialogTitle className={styles.dialogTitle}>Confirmation</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <h2>{message}</h2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary" className={styles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" className={styles.confirmButton}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Modal;