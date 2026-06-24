import express from 'express'
import { getAllLocations, getLocationById } from '../controllers/locations.js'
import { getEventsByLocationId } from '../controllers/events.js'

const router = express.Router()

router.get('/', getAllLocations)
router.get('/:id', getLocationById)
router.get('/:locationId/events', getEventsByLocationId)

export default router