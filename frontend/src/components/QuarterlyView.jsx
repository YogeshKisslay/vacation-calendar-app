
import React from 'react';
import MonthlyView from './MonthlyView';

const QuarterlyView = ({ date, holidays, holidaysLookup }) => {
    const startMonth = Math.floor(date.getMonth() / 3) * 3;
    const year = date.getFullYear();
    const months = [
        new Date(year, startMonth, 1),
        new Date(year, startMonth + 1, 1),
        new Date(year, startMonth + 2, 1),
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {months.map((monthDate, index) => (
                <div key={index} className="rounded-lg shadow-lg shadow-slate-200/50 border border-slate-200">
                    <h3 className="text-xl font-semibold text-center py-3 bg-slate-50 rounded-t-lg text-slate-700">
                        {monthDate.toLocaleString('default', { month: 'long' })}
                    </h3>
                    <MonthlyView date={monthDate} holidays={holidays} holidaysLookup={holidaysLookup} />
                </div>
            ))}
        </div>
    );
};

export default QuarterlyView;