import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filters/slice';
import styles from './SearchBox.module.css'; 

const SearchBox = ({ value, onSearchChange }) => {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={styles.searchBoxContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search contacts"
        value={value}
        onChange={handleSearchChange}
      />
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBox;