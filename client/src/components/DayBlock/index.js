import React from 'react';
import './index.css';

function DayBlock() {
  return (
    <div className="day-block">
      <div className="event-date-container">
        <p className="date-style">01.03.2020</p>
      </div>

      <p className="week-style">вівторок</p>

      <div className="event-type-container">
        <div>
          <p className="event-type-text">Власник</p>
        </div>
        <p className="event-deffault-text">Короткий заголовок</p>
      </div>
      <p className="event-time-deffault">12:00</p>
    </div>
  );
}

export default DayBlock;
