import { CircularProgress } from '@material-ui/core';
import React from 'react';
import styles from './LoadingStatus.module.scss';

function LoadingStatus() {
  return (
    <div className={styles.statusContainer}>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <CircularProgress color="secondary" />
        </div>
      </div>
    </div>
  );
}

export default LoadingStatus;
