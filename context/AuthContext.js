import React, { useContext, useState, useEffect } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const supabase = useSupabaseClient();
	const session = useSession();

	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState('');

	async function signup(email, password, username) {
		const { user, error } = await supabase.auth.signUp(
			{
				email,
				password,
			},
			{
				data: { username },
			}
		);

		if (error) {
			console.log(error);
			setMessage(error.message);
		} else {
			setLoading(false);
			setCurrentUser(user);
		}
	}

	async function login(email, password) {
		const { user, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.log(error);
			setMessage(error.message);
		} else {
			setMessage('Logged In');
			setLoading(false);
			setCurrentUser(user);
		}
	}

	async function logout() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error);
			setMessage(error.message);
		} else {
			setCurrentUser(null);
			setLoading(false);
			setMessage('Logged Out successfully');
		}
	}

	

	const value = {
		message,
		login,
		signup,
		logout,
		// resetPassword,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
