import React from 'react';
import styles from '../styles/Button.module.css';

interface IButton {
	className?: string,
	label: string,
	color: 'red' | 'blue' | 'green',
	onClick?: React.MouseEventHandler<HTMLButtonElement>,
	disabled?: boolean
}

const Button: React.FC<IButton> = ({ className, children, label, color, onClick, disabled }) => {
	return (
		<button
			className={`${styles.Button} ${className} ${colors[color]} disabled:bg-slate-400`}
			aria-label={label} onClick={onClick} disabled={disabled}
		>
			{children}
		</button>
	);
};


const colors = {
	'red': 'from-red-700 to-orange-600 hover:from-red-600 hover:to-orange-500',
	'blue': 'from-blue-700 to-cyan-600 hover:from-blue-600 hover:to-cyan-500',
	'green': 'from-green-700 to-emerald-600 hover:from-green-600 hover:to-emerald-500',
};

Button.defaultProps = {
	className: '',
	label: 'Button',
	disabled: false
};

export default Button;
