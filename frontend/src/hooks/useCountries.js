import { useState, useEffect } from 'react';
import axios from 'axios';

// Using the same API key as your holiday hook.
const CALENDARIFIC_API_KEY = 'ZOMiGvOb3XAhVw0e2aTjGO2IqWUGCKX1';

export const useCountries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`https://calendarific.com/api/v2/countries?api_key=${CALENDARIFIC_API_KEY}`);
                if (response.data?.response?.countries) {
                    // Sort countries alphabetically for better search results
                    const sortedCountries = response.data.response.countries.sort((a, b) => 
                        a.country_name.localeCompare(b.country_name)
                    );
                    setCountries(sortedCountries);
                }
            } catch (e) {
                setError('Failed to fetch country list.');
                console.error("Error fetching countries:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    return { countries, loading, error };
};