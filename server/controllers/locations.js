import { pool } from '../config/database.js'

export const getAllLocations = async (req, res) => {
	try {
		const results = await pool.query('SELECT * FROM locations ORDER BY id')
		res.json(results.rows)
	}
	catch (error) {
		res.status(500).json({ error: 'Failed to fetch locations' })
	}
}

export const getLocationById = async (req, res) => {
	try {
		const { id } = req.params
		const results = await pool.query('SELECT * FROM locations WHERE id = $1', [id])

		if (results.rows.length === 0) {
			return res.status(404).json({ error: 'Location not found' })
		}

		res.json(results.rows[0])
	}
	catch (error) {
		res.status(500).json({ error: 'Failed to fetch location' })
	}
}