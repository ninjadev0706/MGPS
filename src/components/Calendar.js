import React, { useState, useEffect } from "react";

const Calendar = () => {
    const [currentTime, setCurrentTime] = useState(new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const leftDays = () => {
        const leftDay =
            (1688255999000 - (Date.now())) / 86400000;

        return Number(leftDay.toFixed(0)) + 1;

    };
    return (
        <div className="calendar-section">
            <img alt="calendar" src="calendar.png" />
            <p className="calendar-title font-non-nulshock fs-20 ml-10">
                &nbsp;{leftDays()} day(s) left
            </p>
        </div>
    );
};

export default Calendar;
