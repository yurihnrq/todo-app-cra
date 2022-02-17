import React from 'react';
import styles from './styles/Spinner.module.css';

interface ISpinner {
  color?: 'blue' | 'green' | 'red';
  className?: string;
}

const Spinner: React.FC<ISpinner> = ({ color, className }) => {
  let colorStyles = styles.blue;
  if (color === 'green') colorStyles = styles.green;
  if (color === 'red') colorStyles = styles.red;

  return <div className={`${styles.Spinner} ${colorStyles} ${className}`} />;
};

Spinner.defaultProps = {
  color: 'blue',
  className: ''
};

export default Spinner;
