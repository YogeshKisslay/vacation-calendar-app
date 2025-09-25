

import React, { useState } from 'react';
import CalendarHeader from './components/CalendarHeader';
import MonthlyView from './components/MonthlyView';
import QuarterlyView from './components/QuarterlyView';
import { useHolidays } from './hooks/useHolidays';

function App() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('monthly');
    const [country, setCountry] = useState('IN'); // Default to India

    const { holidays, holidaysLookup, loading, error } = useHolidays(country, currentDate.getFullYear());

    const handlePrev = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - (view === 'monthly' ? 1 : 3), 1));
    };

    const handleNext = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + (view === 'monthly' ? 1 : 3), 1));
    };
    
    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };
    
    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value, 10);
        setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
    };

    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value, 10);
        setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const getHeaderText = () => {
        const quarter = Math.floor(currentDate.getMonth() / 3) + 1;
        return `Quarter${quarter}`;
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-indigo-100 min-h-screen font-sans antialiased">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
                <div className="bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-200">
                    <CalendarHeader
                        view={view}
                        setView={setView}
                        country={country}
                        handleCountryChange={handleCountryChange}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        getHeaderText={getHeaderText}
                        currentMonth={currentDate.getMonth()}
                        currentYear={currentDate.getFullYear()}
                        handleMonthChange={handleMonthChange}
                        handleYearChange={handleYearChange}
                        goToToday={goToToday}
                    />
                    
                    <main key={country + currentDate.toString() + view} className="animate-fadeInUp">
                        {loading && <div className="text-center p-12 text-slate-500">Loading holidays...</div>}
                        {error && <div className="text-center p-12 text-red-600 bg-red-50 rounded-lg">{error}</div>}
                        
                        {!loading && !error && (
                            view === 'monthly' 
                                ? <MonthlyView date={currentDate} holidays={holidays} holidaysLookup={holidaysLookup} /> 
                                : <QuarterlyView date={currentDate} holidays={holidays} holidaysLookup={holidaysLookup} />
                        )}
                    </main>
                </div>
                 <footer className="text-center mt-8 text-slate-400 text-sm animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                    Calendar data provided by Calendarific.
                </footer>
            </div>
        </div>
    );
}

export default App;

