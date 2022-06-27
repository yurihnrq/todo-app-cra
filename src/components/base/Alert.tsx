import React from 'react';
import styles from './styles/Alert.module.css';

interface IAlert {
  color?: 'blue' | 'green' | 'red';
  className?: string;
}

const Alert: React.FC<IAlert> = ({ color, className = '', children }) => {
  let colorStyle = styles.blue;
  if (color === 'green') colorStyle = styles.green;
  if (color === 'red') colorStyle = styles.red;

  return <span className={`${styles.Alert} ${colorStyle} ${className}`}>{children}</span>;
};

export default Alert;
