const express = require('express');
const cors = require('cors');
const holidayRoutes = require('./routes/holidayRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
// All holiday-related routes are now handled by this router
app.use('/api/holidays', holidayRoutes);

// A simple root route to confirm the server is running
app.get('/', (req, res) => {
    res.send('Vacation Calendar Backend is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});