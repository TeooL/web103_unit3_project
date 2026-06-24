const API_BASE = '/api/locations'

const handleResponse = async (response) => {
	if (!response.ok) {
		throw new Error('Unable to load locations')
	}

	return response.json()
}

const LocationsAPI = {
	getAllLocations: async () => {
		const response = await fetch(API_BASE)
		return handleResponse(response)
	},
	getLocationById: async (id) => {
		const response = await fetch(`${API_BASE}/${id}`)
		return handleResponse(response)
	},
	getEventsByLocationId: async (locationId) => {
		const response = await fetch(`${API_BASE}/${locationId}/events`)
		return handleResponse(response)
	}
}

export default LocationsAPI