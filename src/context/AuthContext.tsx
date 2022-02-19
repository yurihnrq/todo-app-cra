import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from '../backend/config';
import {
  getAuth,
  User,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset
} from 'firebase/auth';

interface IAuthContext {
  user: User | null;
  loading: boolean;
  login?: (email: string, password: string) => Promise<UserCredential>;
  signup?: (email: string, password: string) => Promise<UserCredential>;
  logout?: () => Promise<void>;
  requestPasswordReset?: (email: string) => Promise<void>;
  setNewPassword?: (code: string, newPassword: string) => Promise<void>;
}

const initialContext: IAuthContext = {
  user: null,
  loading: true
};

const AuthContext = createContext<IAuthContext>(initialContext);
export const useAuth = () => {
  return useContext(AuthContext);
};

const auth = getAuth(firebase);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const requestPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const setNewPassword = (code: string, newPassword: string) => {
    return confirmPasswordReset(auth, code, newPassword);
  };

  const value: IAuthContext = {
    user,
    loading,
    login,
    signup,
    logout,
    requestPasswordReset,
    setNewPassword
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      setUser(null);
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
