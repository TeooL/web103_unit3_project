import React, { useEffect, useState } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const Events = () => {
	const [events, setEvents] = useState([])

	useEffect(() => {
		(async () => {
			try {
				const eventsData = await EventsAPI.getAllEvents()
				setEvents(eventsData)
			}
			catch (error) {
				throw error
			}
		})()
	}, [])

	return (
		<div className='location-events'>
			<header>
				<div className='location-info'>
					<h2>All Events</h2>
					<p>Browse upcoming community music events across every venue.</p>
				</div>
			</header>

			<main>
				{
					events && events.length > 0 ? events.map((event) =>
						<Event
							key={event.id}
							eventData={event}
						/>
					) : <h2>No events available yet.</h2>
				}
			</main>
		</div>
	)
}

export default Events