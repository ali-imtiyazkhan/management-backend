const express = require('express');
const router = express.Router();
const {
    createEvent,
    getEventDetails,
    registerEvent,
    cancelRegistration,
    listUpcomingEvents,
    getEventStats,
} = require('../controllers/eventsController');
const authMiddleware = require('../middleawre/authMiddleware');


router.get('/upcoming', listUpcomingEvents);

router.post('/', authMiddleware, createEvent);
router.get('/:id/stats', authMiddleware, getEventStats);
router.get('/:id', authMiddleware, getEventDetails);
router.post('/:id/register', authMiddleware, registerEvent);
router.post('/:id/cancel', authMiddleware, cancelRegistration);

module.exports = router;
