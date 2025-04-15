import { type ErrorMessageProps } from './types';

import styles from '@/styles/components/ErrorMessage.module.scss';

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className={`alert alert-danger ${styles.errorMessage}`} role="alert">
      {message}
    </div>
  );
};
