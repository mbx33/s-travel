import React from 'react';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

import Signup from '../../components/Signup';

const SignupPage = () => {
	const supabase = useSupabaseClient();

	return <Signup supabase={supabase} />;
};

export default SignupPage;
