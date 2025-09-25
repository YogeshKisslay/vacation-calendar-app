

import React, { useState, useEffect, useRef } from 'react';
import { useCountries } from '../hooks/useCountries';

const CalendarHeader = ({ view, setView, country, handleCountryChange, handlePrev, handleNext, getHeaderText, currentMonth, currentYear, handleMonthChange, handleYearChange, goToToday }) => {
    const { countries, loading: countriesLoading } = useCountries();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const wrapperRef = useRef(null);

    const selectedCountry = countries.find(c => c['iso-3166'] === country);
    const yearOptions = Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i);
    const monthOptions = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        if (searchTerm) {
            setFilteredCountries(
                countries.filter(c => 
                    c.country_name.toLowerCase().includes(searchTerm.toLowerCase())
                ).slice(0, 5)
            );
        } else {
            setFilteredCountries([]);
        }
    }, [searchTerm, countries]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setSearchTerm(''); 
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSelectCountry = (countryCode) => {
        handleCountryChange({ target: { value: countryCode } });
        setSearchTerm('');
        setIsDropdownOpen(false);
    };
    
    const handleFocus = () => {
        setIsDropdownOpen(true);
        if (selectedCountry) {
            setSearchTerm(selectedCountry.country_name);
        }
    };

    return (
        <header className="p-4 rounded-lg animate-fadeInUp backdrop-blur-md bg-white/60 border border-slate-200/80 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                {/* --- THIS IS THE NEW STYLISH LOGO --- */}
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-600 rounded-lg shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                        Vaca<span className="text-indigo-600">Cal</span>
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                     <div ref={wrapperRef} className="relative w-56">
                        <input
                            type="text"
                            placeholder={countriesLoading ? "Loading..." : "Search country..."}
                            className="w-full pl-10 pr-4 py-2 text-slate-700 bg-white/80 border border-slate-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            onFocus={handleFocus}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={isDropdownOpen ? searchTerm : (selectedCountry ? selectedCountry.country_name : '')}
                        />
                        <svg className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>

                        {isDropdownOpen && (searchTerm.length > 0) && (
                            <ul className="absolute z-10 w-full mt-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                {filteredCountries.length > 0 ? filteredCountries.map(c => (
                                    <li key={c['iso-3166']} 
                                        onClick={() => handleSelectCountry(c['iso-3166'])}
                                        className="px-4 py-2 text-slate-800 hover:bg-indigo-600 hover:text-white cursor-pointer transition-colors">
                                        {c.country_name}
                                    </li>
                                )) : <li className="px-4 py-2 text-slate-500">No results found.</li>}
                            </ul>
                        )}
                    </div>
                    <div className="flex rounded-full shadow-sm bg-white border border-slate-300">
                        <button onClick={() => setView('monthly')} className={`px-4 py-2 rounded-l-full font-medium transition-all duration-200 text-sm ${view === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>Monthly</button>
                        <button onClick={() => setView('quarterly')} className={`px-4 py-2 rounded-r-full font-medium transition-all duration-200 text-sm ${view === 'quarterly' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>Quarterly</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <button onClick={handlePrev} className="p-2 text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="flex items-center space-x-4">
                    <button onClick={goToToday} className="px-4 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100/50 border border-indigo-200 rounded-full hover:bg-indigo-100 transition-colors">
                        Today's Month
                    </button>
                    <div className="flex items-center space-x-2 text-2xl font-semibold text-slate-700">
                        {view === 'monthly' ? (
                            <div className="relative group">
                                <span className="cursor-pointer group-hover:text-indigo-600 transition-colors">{monthOptions[currentMonth]}</span>
                                <select 
                                    value={currentMonth} 
                                    onChange={handleMonthChange}
                                    size="5"
                                    className="bg-white/80 backdrop-blur-sm shadow-lg border border-slate-200 font-semibold rounded-lg p-1 absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all cursor-pointer h-40 z-20 focus:ring-0 border-none -translate-x-2 pointer-events-none group-hover:pointer-events-auto"
                                >
                                    {monthOptions.map((month, index) => <option key={month} value={index} className="font-semibold rounded-md hover:bg-indigo-100 p-1">{month}</option>)}
                                </select>
                            </div>
                        ) : (
                            <h2>{getHeaderText()}</h2>
                        )}
                        <div className="relative group">
                            <span className="cursor-pointer group-hover:text-indigo-600 transition-colors">{currentYear}</span>
                            <select 
                                value={currentYear} 
                                onChange={handleYearChange}
                                size="5"
                                className="bg-white/80 backdrop-blur-sm shadow-lg border border-slate-200 font-semibold rounded-lg p-1 absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all cursor-pointer h-40 z-20 focus:ring-0 border-none -translate-x-2 pointer-events-none group-hover:pointer-events-auto"
                            >
                                {yearOptions.map(year => <option key={year} value={year} className="font-semibold rounded-md hover:bg-indigo-100 p-1">{year}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <button onClick={handleNext} className="p-2 text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </header>
    );
};

export default CalendarHeader;
