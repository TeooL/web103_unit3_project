const API_BASE = '/api/events'

const handleResponse = async (response) => {
	if (!response.ok) {
		throw new Error('Unable to load events')
	}

	return response.json()
}

const EventsAPI = {
	getAllEvents: async () => {
		const response = await fetch(API_BASE)
		return handleResponse(response)
	},
	getEventById: async (id) => {
		const response = await fetch(`${API_BASE}/${id}`)
		return handleResponse(response)
	},
	getEventsByLocationId: async (locationId) => {
		const response = await fetch(`/api/locations/${locationId}/events`)
		return handleResponse(response)
	}
}

export default EventsAPI