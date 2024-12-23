import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Phonebook App!</h1>
      <p className={styles.description}>
        This is the main page where you can manage your contacts.
      </p>
      <p className={styles.additionalDescription}>
        Here, you can view, add, and update your contacts in the phonebook.
      </p>
    </div>
  );
};

export default HomePage;