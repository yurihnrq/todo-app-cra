import React from 'react';
import styles from './styles/Alert.module.css';

interface IAlert {
  color?: 'blue' | 'green' | 'red';
}

const Alert: React.FC<IAlert> = ({ color, children }) => {
  let colorStyle = styles.blue;
  if (color === 'green') colorStyle = styles.green;
  if (color === 'red') colorStyle = styles.red;

  return <span className={`${styles.Alert} ${colorStyle}`}>{children}</span>;
};

export default Alert;
