import React from 'react';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

import Signup from '../../components/Signup';

const SignupPage = () => {
	const supabase = useSupabaseClient();
	const session = useSession();

	return <Signup supabase={supabase} session={session} />;
};

export default SignupPage;
