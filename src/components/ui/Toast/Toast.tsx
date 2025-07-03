import React from 'react';
import styles from './Toast.module.scss';
import Icon from '@/assets/Check.svg';

interface ToastProps {
  message: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  visible
}) => {
  return (
    <div className={`${styles.toastWrapper} ${visible ? styles.show : ''}`}>
      <div className={styles.toast}>
        <Icon />
        <p>{message}</p>
      </div>
    </div>
  );
};
