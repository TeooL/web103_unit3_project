import { pool } from '../config/database.js'

export const getAllEvents = async (req, res) => {
	try {
		const results = await pool.query('SELECT * FROM events ORDER BY date, time, id')
		res.json(results.rows)
	}
	catch (error) {
		res.status(500).json({ error: 'Failed to fetch events' })
	}
}

export const getEventById = async (req, res) => {
	try {
		const { id } = req.params
		const results = await pool.query('SELECT * FROM events WHERE id = $1', [id])

		if (results.rows.length === 0) {
			return res.status(404).json({ error: 'Event not found' })
		}

		res.json(results.rows[0])
	}
	catch (error) {
		res.status(500).json({ error: 'Failed to fetch event' })
	}
}

export const getEventsByLocationId = async (req, res) => {
	try {
		const { locationId } = req.params
		const results = await pool.query(
			'SELECT * FROM events WHERE location_id = $1 ORDER BY date, time, id',
			[locationId]
		)

		res.json(results.rows)
	}
	catch (error) {
		res.status(500).json({ error: 'Failed to fetch events for location' })
	}
}