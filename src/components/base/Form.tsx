import React from 'react';
import styles from './styles/Form.module.css';

interface IForm {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  className?: string;
}

const Form: React.FC<IForm> = ({ onSubmit, className, children }) => {
  return (
    <form className={`${styles.Form} ${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

Form.defaultProps = {
  onSubmit: e => e.preventDefault(),
  className: ''
};

export default Form;
