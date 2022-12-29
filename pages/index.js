import Head from 'next/head';
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

// component imports
import ParisHero from '../components/hero/ParisHero';

// style imports

export default function Home() {
	const session = useSession();
	const user = useUser();
	const supabase = useSupabaseClient();

	return (
		<div>
			<Head>
				<title>Student Travel</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ParisHero />
		</div>
	);
}
