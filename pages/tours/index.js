import { useState } from 'react';
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

// component imports
import ParisTours from '../../components/tours/ParisTours';

const ToursPage = () => {
	const session = useSession();
	const supabase = useSupabaseClient();
	const user = useUser();

	const [parisTour, setParisTour] = useState([]);

	const getTours = async () => {
		const { data: paris_tour, error } = await supabase.from('paris_tour').select('*');
		console.log(paris_tour, 'paris_tour');
		setParisTour(parisTour);
	};

	return (
		<div>
			{user ? <ParisTours tour={parisTour} /> : <p>Not logged in, Please login</p>}
		</div>
	);
};

export default ToursPage;
