import React, { ChangeEventHandler } from 'react';
import styles from './styles/Input.module.css';

interface IInput {
  id?: string;
  type: React.HTMLInputTypeAttribute;
  value: string | number | undefined;
  required?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  className?: string;
  placeholder?: string | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean
}

const Input: React.FC<IInput> = ({
  id,
  type,
  value,
  required,
  min,
  max,
  maxLength,
  minLength,
  className,
  placeholder,
  onChange,
  disabled
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      required={required}
      min={min}
      max={max}
      maxLength={maxLength}
      minLength={minLength}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.Input} ${className}`}
      disabled={disabled}
    />
  );
};

Input.defaultProps = {
  className: '',
  placeholder: '',
  onChange: e => {
    console.log(e);
  },
  disabled: false
};

export default Input;
