import React, { ChangeEventHandler } from 'react';
import styles from '../styles/Input.module.css';

interface IInput {
	id?: string,
	type: string,
	value: string | number | undefined,
	required?: boolean,
	min?: number,
	max?: number
	maxLength?: number,
	minLenhth?: number
	className?: string,
	placeholder?: string | undefined,
	onChange?: ChangeEventHandler<HTMLInputElement>,
}

const Input: React.FC<IInput> = ({
	id, type, value, required,
	min, max, maxLength, minLenhth,
	className, placeholder, onChange
}) => {
	return (
		<input
			type={type} id={id} value={value} required={required} min={min} max={max}
			maxLength={maxLength} minLength={minLenhth}
			onChange={onChange} placeholder={placeholder}
			className={`
				${styles.Input} ${className} 
				dark:bg-slate-500 dark:text-white
			`}
		/>
	);
};

Input.defaultProps = {
	className: '',
	placeholder: '',
	onChange: (e) => { console.log(e); }
};

export default Input;
