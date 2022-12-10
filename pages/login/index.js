import React from 'react';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

import Login from '../../components/Login';

const LoginPage = () => {
	const supabase = useSupabaseClient();

	return <Login supabase={supabase} />;
};

export default LoginPage;
