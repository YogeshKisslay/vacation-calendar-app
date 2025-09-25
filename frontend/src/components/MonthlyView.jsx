// import React from 'react';

// const MonthlyView = ({ date, holidays, holidaysLookup }) => {
//     const getMonthDays = (d) => {
//         const year = d.getFullYear();
//         const month = d.getMonth();
//         const firstDayOfMonth = new Date(year, month, 1);
//         const lastDayOfMonth = new Date(year, month + 1, 0);
//         const days = [];
//         for (let i = 0; i < firstDayOfMonth.getDay(); i++) days.push(null);
//         for (let i = 1; i <= lastDayOfMonth.getDate(); i++) days.push(new Date(year, month, i));
//         return days;
//     };

//     const monthDays = getMonthDays(date);
//     const weeks = [];
//     for (let i = 0; i < monthDays.length; i += 7) {
//         weeks.push(monthDays.slice(i, i + 7));
//     }

//     const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//     return (
//         <div>
//             <div className="grid grid-cols-7 gap-px text-center font-semibold text-sm text-gray-600 border-b pb-2">
//                 {dayNames.map(day => <div key={day}>{day}</div>)}
//             </div>
//             <div className="grid grid-cols-1">
//                 {weeks.map((week, weekIndex) => {
//                     const holidaysInWeek = week.filter(day => day && holidaysLookup.has(day.toISOString().split('T')[0])).length;
                    
//                     let weekBgClass = 'transition-colors duration-300';
//                     if (holidaysInWeek === 1) weekBgClass += ' bg-green-100';
//                     else if (holidaysInWeek > 1) weekBgClass += ' bg-gray-200';

//                     return (
//                         <div key={weekIndex} className={`grid grid-cols-7 rounded-lg my-0.5 ${weekBgClass}`}>
//                             {week.map((day, dayIndex) => {
//                                 if (!day) return <div key={`${weekIndex}-${dayIndex}`} className="p-1 h-28"></div>;
                                
//                                 const dateString = day.toISOString().split('T')[0];
//                                 const isHoliday = holidaysLookup.has(dateString);
//                                 const isToday = new Date().toISOString().split('T')[0] === dateString;

//                                 return (
//                                     <div key={dateString} className={`p-1 h-28 flex flex-col items-center ${isHoliday ? 'rounded-md bg-white/60 shadow-sm' : ''}`}>
//                                         <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${isToday ? 'bg-indigo-600 text-white' : ''} ${isHoliday ? 'font-bold text-red-600' : 'text-gray-700'}`}>
//                                             {day.getDate()}
//                                         </span>
//                                         {isHoliday && (
//                                             <div className="mt-1 text-xs text-center text-red-700 font-medium break-words px-1 overflow-hidden" title={holidays[dateString]}>
//                                                 {holidays[dateString]}
//                                             </div>
//                                         )}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default MonthlyView;
// import React from 'react';

// const MonthlyView = ({ date, holidays, holidaysLookup }) => {
//     const getMonthDays = (d) => {
//         const year = d.getFullYear();
//         const month = d.getMonth();
//         const firstDayOfMonth = new Date(year, month, 1).getDay();
//         const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
//         const days = [];
        
//         for (let i = 0; i < firstDayOfMonth; i++) days.push({ key: `empty-${i}`, day: null });
//         for (let i = 1; i <= lastDateOfMonth; i++) days.push({ key: `${year}-${month}-${i}`, day: new Date(year, month, i) });
        
//         return days;
//     };

//     const monthDays = getMonthDays(date);
//     const weeks = [];
//     for (let i = 0; i < monthDays.length; i += 7) {
//         weeks.push(monthDays.slice(i, i + 7));
//     }

//     const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//     return (
//         <div className="bg-transparent mt-4">
//             <div className="grid grid-cols-7 text-center font-semibold text-sm text-slate-500 border-b border-slate-300/40">
//                 {dayNames.map(day => <div key={day} className="py-3">{day}</div>)}
//             </div>
//             <div className="grid grid-cols-1">
//                 {weeks.map((week, weekIndex) => {
//                     const holidaysInWeek = week.filter(({day}) => day && holidaysLookup.has(day.toISOString().split('T')[0])).length;
                    
//                     let weekBgClass = 'transition-colors duration-500 ease-in-out rounded-xl';
//                     if (holidaysInWeek === 1) {
//                         weekBgClass += ' bg-green-500/10';
//                     } else if (holidaysInWeek > 1) {
//                         weekBgClass += ' bg-slate-500/20';
//                     }

//                     return (
//                         <div key={weekIndex} className={`grid grid-cols-7 my-1 ${weekBgClass}`}>
//                             {week.map(({key, day}) => {
//                                 if (!day) return <div key={key} className="h-28 sm:h-32"></div>;
                                
//                                 const dateString = day.toISOString().split('T')[0];
//                                 const isHoliday = holidaysLookup.has(dateString);
//                                 const isToday = new Date().toISOString().split('T')[0] === dateString;

//                                 // --- THIS IS THE FIX: Added a conditional background for holidays ---
//                                 const holidayBgClass = isHoliday ? 'bg-rose-500/10' : '';

//                                 return (
//                                     <div key={key} className={`relative h-28 sm:h-32 flex flex-col p-2 group transition-all duration-300 ease-out hover:bg-white/50 hover:shadow-lg hover:scale-105 hover:z-10 rounded-lg ${holidayBgClass}`}>
//                                         <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all ${isToday ? 'bg-indigo-600 text-white' : 'text-slate-700'} ${isHoliday ? 'font-bold text-rose-600' : ''}`}>
//                                             {day.getDate()}
//                                         </span>
//                                         {isHoliday && (
//                                             <div className="mt-1 text-xs text-center text-rose-700 font-semibold break-words px-1 overflow-hidden truncate">
//                                                 {holidays[dateString]}
//                                             </div>
//                                         )}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default MonthlyView;


import React from 'react';

const MonthlyView = ({ date, holidays, holidaysLookup }) => {
    const getMonthDays = (d) => {
        const year = d.getFullYear();
        const month = d.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        const days = [];
        
        for (let i = 0; i < firstDayOfMonth; i++) days.push({ key: `empty-${i}`, day: null });
        for (let i = 1; i <= lastDateOfMonth; i++) days.push({ key: `${year}-${month}-${i}`, day: new Date(year, month, i) });
        
        return days;
    };

    const monthDays = getMonthDays(date);
    const weeks = [];
    for (let i = 0; i < monthDays.length; i += 7) {
        weeks.push(monthDays.slice(i, i + 7));
    }

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="bg-transparent mt-4">
            <div className="grid grid-cols-7 text-center font-semibold text-sm text-slate-500 border-b border-slate-300/40">
                {dayNames.map(day => <div key={day} className="py-3">{day}</div>)}
            </div>
            <div className="grid grid-cols-1">
                {weeks.map((week, weekIndex) => {
                    const holidaysInWeek = week.filter(({day}) => day && holidaysLookup.has(day.toISOString().split('T')[0])).length;
                    
                    let weekBgClass = 'transition-colors duration-500 ease-in-out rounded-xl';
                    if (holidaysInWeek === 1) {
                        weekBgClass += ' bg-green-500/10';
                    } else if (holidaysInWeek > 1) {
                        weekBgClass += ' bg-slate-500/20';
                    }

                    return (
                        <div key={weekIndex} className={`grid grid-cols-7 my-1 ${weekBgClass}`}>
                            {week.map(({key, day}) => {
                                if (!day) return <div key={key} className="h-28 sm:h-32"></div>;
                                
                                const dateString = day.toISOString().split('T')[0];
                                const isHoliday = holidaysLookup.has(dateString);
                                const isToday = new Date().toISOString().split('T')[0] === dateString;
                                const holidayBgClass = isHoliday ? 'bg-rose-500/10' : '';

                                return (
                                    <div key={key} className={`relative h-28 sm:h-32 flex flex-col p-2 group transition-all duration-300 ease-out hover:bg-white/50 hover:shadow-lg hover:scale-105 hover:z-10 rounded-lg ${holidayBgClass}`}>
                                        <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all ${isToday ? 'bg-indigo-600 text-white' : 'text-slate-700'} ${isHoliday ? 'font-bold text-rose-600' : ''}`}>
                                            {day.getDate()}
                                        </span>
                                        {isHoliday && (
                                            <div className="mt-1 text-xs text-center text-rose-700 font-semibold break-words px-1 overflow-hidden truncate">
                                                {holidays[dateString]}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthlyView;