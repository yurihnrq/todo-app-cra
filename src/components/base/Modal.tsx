import React from 'react';
import { CloseIcon } from './Icons';
import styles from './styles/Modal.module.css';

interface IModal {
  title: string;
  onClose: () => void;
}

const Modal: React.FC<IModal> = ({ title, children, onClose }) => {
  return (
    <div className={styles.Modal}>
      <div className={styles.content}>
        <header>
          <h1 className={styles.title}>{title}</h1>
          <button onClick={onClose} className={styles.closeButton}>
            <CloseIcon />
          </button>
        </header>
        <section>{children}</section>
      </div>
    </div>
  );
};

export default Modal;
