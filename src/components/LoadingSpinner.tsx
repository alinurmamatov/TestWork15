import styles from '@/styles/components/LoadingSpinner.module.scss';

export const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
