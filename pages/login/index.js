import React from 'react';

import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import Login from '../../components/Login';

const LoginPage = () => {
	const user = useUser();
	const supabase = useSupabaseClient();
	const session = useSession();

	if (!user) {
		return <Login supabase={supabase} session={session} />;
	}
	//redirect to home page
	return <div>Logged in</div>;
};

export default LoginPage;
