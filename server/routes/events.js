const express = require('express');
const router = express.Router();
const { createEvent, getEventDetails, registerEvent, cancelRegistration, listUpcomingEvents, getEventStats } = require('../controllers/eventsController');

router.post('/', createEvent);
router.get('/:id', getEventDetails);
router.post('/:id/register', registerEvent);
router.post('/:id/cancel', cancelRegistration);
router.get('/upcoming', listUpcomingEvents);
router.get('/:id/stats', getEventStats);

module.exports = router;
