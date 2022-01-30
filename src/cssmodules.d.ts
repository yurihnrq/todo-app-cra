// This file must be created to prevent errors in production build process.
declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}
