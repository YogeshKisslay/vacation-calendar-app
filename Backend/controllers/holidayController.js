const axios = require('axios');

// --- IMPORTANT: The API key should be defined ONCE, at the top ---
const CALENDARIFIC_API_KEY = 'ZOMiGvOb3XAhVw0e2aTjGO2IqWUGCKX1'; 

// Controller function to get holidays
const getHolidays = async (req, res) => {
    const { countryCode, year } = req.params;

    // This check now correctly reads the key defined above
    if (CALENDARIFIC_API_KEY === 'YOUR_API_KEY_GOES_HERE') {
        return res.status(500).json({ message: 'Server is missing API key for Calendarific.' });
    }

    if (!countryCode || !year) {
        return res.status(400).json({ message: 'Country code and year are required.' });
    }

    try {
        // We removed the duplicate key declaration from here
        const apiUrl = `https://calendarific.com/api/v2/holidays?&api_key=${CALENDARIFIC_API_KEY}&country=${countryCode}&year=${year}`;
        
        console.log(`Fetching from Calendarific API: ${apiUrl}`);
        const response = await axios.get(apiUrl);
        
        const holidayData = response.data.response.holidays;

        if (!Array.isArray(holidayData)) {
            console.warn(`Calendarific API returned no valid holiday data for ${countryCode}/${year}.`);
            return res.status(200).json([]);
        }
        
        const holidays = holidayData.map(holiday => ({
            date: holiday.date.iso.substring(0, 10),
            name: holiday.name
        }));

        res.status(200).json(holidays);

    } catch (error) {
        console.error(`Error fetching holidays for ${countryCode}/${year}:`, error.message);
        
        if (error.response) {
             return res.status(error.response.status).json({ 
                message: `API error: ${error.response.data?.meta?.error_detail || 'Failed to fetch data.'}` 
            });
        }
        
        res.status(500).json({ message: 'An internal server error occurred. Please try again later.' });
    }
};

module.exports = {
    getHolidays,
};