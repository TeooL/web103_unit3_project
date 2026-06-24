import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import '../css/Event.css'

const Event = (props) => {

    const [event, setEvent] = useState(props.eventData || {})
    const [time, setTime] = useState('')
    const [remaining, setRemaining] = useState('')

    useEffect(() => {
		if (props.eventData) {
			setEvent(props.eventData)
			return
		}

        (async () => {
            try {
                const eventData = await EventsAPI.getEventById(props.id)
                setEvent(eventData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [props.id, props.eventData])

    useEffect(() => {
        setTime(event.time || '')
        setRemaining(event.remaining || '')
    }, [event])

    return (
        <article className='event-information'>
            <img src={event.image} alt={event.title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {event.date} <br /> {time}</p>
                    <p id={`remaining-${event.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event