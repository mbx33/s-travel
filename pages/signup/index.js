import React from 'react';
import Head from 'next/head';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

import Signup from '../../components/Signup';

const SignupPage = () => {
	const supabase = useSupabaseClient();
	const session = useSession();

	return (
		<div>
			<Signup supabase={supabase} session={session} />;
		</div>
	);
};

export default SignupPage;
