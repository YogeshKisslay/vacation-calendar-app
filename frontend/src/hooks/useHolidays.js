import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const CALENDARIFIC_API_KEY = 'ZOMiGvOb3XAhVw0e2aTjGO2IqWUGCKX1';

export const useHolidays = (country, year) => {
    const [holidays, setHolidays] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHolidays = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiUrl = `https://calendarific.com/api/v2/holidays?&api_key=${CALENDARIFIC_API_KEY}&country=${country}&year=${year}`;
                const response = await axios.get(apiUrl);
                const holidayData = response.data.response.holidays;

                if (Array.isArray(holidayData)) {
                    const holidaysMap = holidayData.reduce((acc, h) => {
                        const date = h.date.iso.substring(0, 10);
                        acc[date] = h.name;
                        return acc;
                    }, {});
                    setHolidays(holidaysMap);
                } else {
                    setHolidays({});
                }
            } catch (e) {
                setError('Failed to fetch holiday data.');
                setHolidays({});
            } finally {
                setLoading(false);
            }
        };

        fetchHolidays();
    }, [year, country]);
    
    const holidaysLookup = useMemo(() => new Set(Object.keys(holidays)), [holidays]);

    return { holidays, holidaysLookup, loading, error };
};