import { useState } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

const ToursPage = () => {
	const session = useSession();

	return (
		<div>
			{session ? <p>Main Page for tours</p> : <p>Not logged in, Please login</p>}
		</div>
	);
};

export default ToursPage;
