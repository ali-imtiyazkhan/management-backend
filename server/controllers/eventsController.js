const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createEvent = async (req, res) => {
    try {
        const { title, date_time, location, capacity, imageUrl } = req.body;

        if (!title || !date_time || !location || !capacity) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        if (capacity <= 0 || capacity > 1000) {
            return res.status(400).json({ error: 'Capacity must be between 1 and 1000.' });
        }

        const event = await prisma.event.create({
            data: {
                title,
                date_time: String(date_time),
                location,
                capacity: Number(capacity),
                imageUrl: imageUrl || null,
            },
        });

        res.status(201).json({ id: event.id, event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


exports.getEventDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) },
            include: { registrations: { include: { user: true } } },
        });

        if (!event) return res.status(404).json({ error: 'Event not found.' });

        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.registerEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) },
            include: { registrations: true },
        });

        if (!event) return res.status(404).json({ error: 'Event not found.' });


        const eventDate = new Date(event.date_time);
        if (isNaN(eventDate)) {
            return res.status(400).json({ error: 'Invalid date format in event.' });
        }

        if (eventDate < new Date()) {
            return res.status(400).json({ error: 'Cannot register for past events.' });
        }

        if (event.registrations.length >= event.capacity) {
            return res.status(400).json({ error: 'Event is full.' });
        }

        const existing = await prisma.registration.findFirst({
            where: { eventId: parseInt(id), userId: parseInt(userId) },
        });

        if (existing) {
            return res.status(400).json({ error: 'User already registered.' });
        }

        await prisma.registration.create({
            data: { eventId: parseInt(id), userId: parseInt(userId) },
        });

        res.json({ message: 'Registration successful.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.cancelRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const registration = await prisma.registration.findFirst({
            where: { eventId: parseInt(id), userId: parseInt(userId) },
        });

        if (!registration) {
            return res.status(400).json({ error: 'User not registered for this event.' });
        }

        await prisma.registration.delete({ where: { id: registration.id } });
        res.json({ message: 'Registration cancelled.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listUpcomingEvents = async (req, res) => {
    try {
        const allEvents = await prisma.event.findMany();

        const now = new Date();


        const upcoming = allEvents.filter((event) => {
            const eventDate = new Date(event.date_time);
            return !isNaN(eventDate) && eventDate > now;
        });

        upcoming.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

        res.json(upcoming);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getEventStats = async (req, res) => {
    try {
        const { id } = req.params;

        // 👇 prevent Prisma "Argument `id` is missing" error
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'Valid event ID is required in the URL.' });
        }

        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) },
            include: { registrations: true },
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        const total = event.registrations.length;
        const remaining = event.capacity - total;
        const percentage = ((total / event.capacity) * 100).toFixed(2);

        res.json({
            event_id: event.id,
            title: event.title,
            total_registrations: total,
            remaining_capacity: remaining,
            percentage_used: `${percentage}%`,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
