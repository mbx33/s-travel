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
			<p>
				We understand that poor food, an unorganized tour guide, too much walking,
				and a poorly located hotel can all be major concerns when it comes to
				choosing a tour. That is why we are committed to providing a high-quality
				experience for all of our guests. First and foremost, we pride ourselves
				on offering delicious and nourishing meals during our tours. Our chefs use
				only the freshest ingredients to prepare our dishes, and we offer a
				variety of options to suit different tastes and dietary needs. Our tour
				guides are highly trained and experienced professionals who are dedicated
				to making sure that every aspect of the tour runs smoothly and
				efficiently. They are knowledgeable about the destinations we visit and
				are happy to answer any questions you may have along the way. We also
				understand that long periods of walking can be tiring, which is why we
				have designed our tours to include plenty of opportunities for rest and
				relaxation. And when it comes to accommodation, we have carefully selected
				hotels that are conveniently located and offer comfortable, well-appointed
				rooms. We believe that these attention to detail and commitment to
				excellence are what set our tours apart, and we hope that you will
				consider giving us the opportunity to show you why we are the best choice
				for your travel needs.
			</p>
		</div>
	);
}
