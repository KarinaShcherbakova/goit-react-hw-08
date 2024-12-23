import PropTypes from 'prop-types';
import styles from './Contact.module.css'; 

export const Contact = ({ name, number, onDelete }) => {
  return (
    <div className={styles.contact}>
      <p className={styles.contactText}>{name}: {number}</p>
      <button className={styles.deleteBtn} onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};