import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from '../backend/config';
import {
	getAuth,
	User,
	UserCredential,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signOut
} from 'firebase/auth';

interface IAuthContext {
	user: User | null,
	login?: (email: string, password: string) => Promise<UserCredential>,
	signup?: (email: string, password: string) => Promise<UserCredential>
	logout?: () => Promise<void>
}

const initialContext: IAuthContext = {
	user: null
};

const AuthContext = createContext<IAuthContext>(initialContext);
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

	const logout = () => {
		return signOut(auth);
	};

	const value: IAuthContext = {
		user,
		login,
		signup,
		logout
	};

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			setUser(user);
		});

		return () => {
			setUser(null);
		};
	}, []);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
