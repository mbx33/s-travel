import React from 'react';

const ParisTours = ({ tours }) => {
	return (
		<div>
			<h1>Paris Tours</h1>
			{tours &&
				tours.map((tour) => {
					const { name, base_price: price, description, itinerary } = tour;
					return (
						<div key={tour.id}>
							<h3>
								{name} <span> ${price}</span>
							</h3>
							<p>{description}</p>
							{itinerary &&
								itinerary.map((item, i) => {
									const { description } = item;
									return (
										<div key={i}>
											<h4>Day {i + 1}</h4>
											<p>{description}</p>
										</div>
									);
								})}
						</div>
					);
				})}
		</div>
	);
};

export default ParisTours;
