//create a useUser hook to keep track of user profile data
import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react';

const useUserProfile = () => {
	const session = useSession();
	const user = useUser();
	const supabase = useSupabaseClient();
	const [userProfile, setUserProfile] = useState(null);

	useEffect(() => {
		const getUserProfiles = async () => {
			const { data: profiles, error } = await supabase
				.from('profiles')
				.select('username')
				.eq('id', user.id);

			if (error) {
				console.error(error);
			}
			console.log(profiles, 'profiles');
			setUserProfile(profiles[0]);
		};
		if (user) {
			getUserProfiles();
		}
	}, [supabase, user]);

	return userProfile;
};

export default useUserProfile;
