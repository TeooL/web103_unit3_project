import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const { pool } = await import('./database.js')

const locations = [
	{
		id: 1,
		name: 'Echo Lounge',
		image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
		address: '1329 Main St',
		city: 'Dallas',
		state: 'TX',
		zip: '75202'
	},
	{
		id: 2,
		name: 'House of Blues',
		image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
		address: '2200 N Lamar St',
		city: 'Dallas',
		state: 'TX',
		zip: '75202'
	},
	{
		id: 3,
		name: 'Pavilion',
		image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
		address: '2925 Richmond Ave',
		city: 'Houston',
		state: 'TX',
		zip: '77098'
	},
	{
		id: 4,
		name: 'American Airlines Center',
		image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
		address: '2500 Victory Ave',
		city: 'Dallas',
		state: 'TX',
		zip: '75219'
	}
]

const events = [
	{
		id: 1,
		location_id: 1,
		title: 'Midnight DJ Set',
		date: '2026-07-12',
		time: '09:00 PM',
		image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
		remaining: '5 days away'
	},
	{
		id: 2,
		location_id: 1,
		title: 'Open Mic Monday',
		date: '2026-07-14',
		time: '07:30 PM',
		image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
		remaining: '7 days away'
	},
	{
		id: 3,
		location_id: 2,
		title: 'Soul Nights Live',
		date: '2026-07-18',
		time: '08:00 PM',
		image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80',
		remaining: '11 days away'
	},
	{
		id: 4,
		location_id: 2,
		title: 'Blues Jam Session',
		date: '2026-07-21',
		time: '08:30 PM',
		image: 'https://images.unsplash.com/photo-1514119412350-e174d90d280e?auto=format&fit=crop&w=900&q=80',
		remaining: '14 days away'
	},
	{
		id: 5,
		location_id: 3,
		title: 'Summer Stage Showcase',
		date: '2026-07-20',
		time: '06:00 PM',
		image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
		remaining: '13 days away'
	},
	{
		id: 6,
		location_id: 3,
		title: 'Rooftop Vinyl Night',
		date: '2026-07-24',
		time: '09:30 PM',
		image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=900&q=80',
		remaining: '17 days away'
	},
	{
		id: 7,
		location_id: 4,
		title: 'Arena Afterparty',
		date: '2026-07-16',
		time: '10:00 PM',
		image: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?auto=format&fit=crop&w=900&q=80',
		remaining: '9 days away'
	},
	{
		id: 8,
		location_id: 4,
		title: 'Community Concert Night',
		date: '2026-07-23',
		time: '07:00 PM',
		image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=900&q=80',
		remaining: '16 days away'
	}
]

const reset = async () => {
	try {
		await pool.query('DROP TABLE IF EXISTS events')
		await pool.query('DROP TABLE IF EXISTS locations')

		await pool.query(`
			CREATE TABLE locations (
				id SERIAL PRIMARY KEY,
				name TEXT NOT NULL,
				image TEXT NOT NULL,
				address TEXT NOT NULL,
				city TEXT NOT NULL,
				state TEXT NOT NULL,
				zip TEXT NOT NULL
			)
		`)

		await pool.query(`
			CREATE TABLE events (
				id SERIAL PRIMARY KEY,
				location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
				title TEXT NOT NULL,
				date TEXT NOT NULL,
				time TEXT NOT NULL,
				image TEXT NOT NULL,
				remaining TEXT
			)
		`)

		for (const location of locations) {
			await pool.query(
				`INSERT INTO locations (id, name, image, address, city, state, zip)
				 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
				[
					location.id,
					location.name,
					location.image,
					location.address,
					location.city,
					location.state,
					location.zip
				]
			)
		}

		for (const event of events) {
			await pool.query(
				`INSERT INTO events (id, location_id, title, date, time, image, remaining)
				 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
				[
					event.id,
					event.location_id,
					event.title,
					event.date,
					event.time,
					event.image,
					event.remaining
				]
			)
		}

		await pool.query("SELECT setval(pg_get_serial_sequence('locations', 'id'), (SELECT MAX(id) FROM locations))")
		await pool.query("SELECT setval(pg_get_serial_sequence('events', 'id'), (SELECT MAX(id) FROM events))")

		console.log('Tables reset successfully')
	}
	catch (error) {
		console.error('Error resetting tables:', error)
	}
	finally {
		await pool.end()
	}
}

reset()
