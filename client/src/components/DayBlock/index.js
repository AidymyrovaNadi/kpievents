import React from 'react';
import './index.css';
import './showDescription.js';



function DayBlock() {

  const descriptionRef = React.createRef()

  const showDescription = () => {
    const style = descriptionRef.current.style
    style.display === "flex" ? style.display = "none" : style.display = "flex"
  }

  return (
    <div className="day-block">
      <div className="event-date-container">
        <p className="date-style">01.03.2020</p>
      </div>

      <p className="week-style">вівторок</p>

      <div className="event-container">
        <p className="event-time-default">12:00</p>
        <div className="event-info">
          <p className="event-type-text">Власник</p>
          <p className="event-default-text" onClick={ showDescription }>Короткий заголовок</p>
          <p className="event-description" ref={descriptionRef}>some interesting data to show asdf asdaasd asd fas afa dsfasdf asdf asdf asdf asd fa</p>
        </div>
      </div>
    </div>
  );
}

export default DayBlock;
