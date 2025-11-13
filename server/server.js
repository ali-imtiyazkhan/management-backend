const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();

app.use(express.json());

app.use(cors());

const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
const uploadRoute = require('./routes/upload');

app.use('/events', eventRoutes);
app.use('/users', userRoutes);

app.use('/api/upload', uploadRoute);


app.get('/', (req, res) => {
    res.send('Event Management API is running');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
