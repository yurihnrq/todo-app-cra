import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from '../backend/config';
import {
	getAuth,
	User,
	UserCredential,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged
} from 'firebase/auth';

interface IAuthContext {
	user: User | null,
	login: (email: string, password: string) => Promise<UserCredential>,
	signup: (email: string, password: string) => Promise<UserCredential>
}

const AuthContext = createContext<IAuthContext | null>(null);
export const useAuth = () => {
	return useContext(AuthContext);
};

const auth = getAuth(firebase);

const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const value: IAuthContext = {
		user,
		login,
		signup
	};

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			setUser(user);
			console.log(user);
		});
	}, []);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
