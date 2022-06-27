import React from 'react';
import styles from './styles/Button.module.css';

interface IButton {
  className?: string;
  label: string;
  color: 'red' | 'blue' | 'green';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<IButton> = ({
  className,
  children,
  label,
  color,
  onClick,
  disabled
}) => {
  return (
    <button
      className={`${styles.Button} ${className} ${styles[color]}`}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  label: 'Button',
  disabled: false
};

export default Button;
