import React from 'react';

import styles from './Button.module.css';

interface IButton {
	className?: string,
	label: string,
	color: 'red' | 'blue' | 'green'
}

const Button: React.FC<IButton> = ({ className, children, label, color }) => {
	return (
		<button className={`${styles.Button} ${className} ${colors[color]}`} aria-label={label}>
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
	label: 'Button'
};

export default Button;
