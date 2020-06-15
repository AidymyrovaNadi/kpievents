import React from 'react';
import './index.css';

function DayBlock(props) {

  const descriptionRef = React.createRef()
  const info = props.info
  const date = new Date(info.datetime)
  const days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]

  const showDescription = () => {
    const style = descriptionRef.current.style
    style.display === "flex" ? style.display = "none" : style.display = "flex"
  }

  return (
    <div className="day-block">
      <div className="event-date-container">
        <p className="date-style">{ `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}` }</p>
      </div>

      <p className="week-style">{ days[date.getDay()] }</p>

      <div className="event-container">
        <p className="event-time-default">{ `${date.getHours()}:${date.getMinutes()}` }</p>
        <div className="event-info">
          <p className="event-type-text">{ info.place }</p>
          <p className="event-default-text" onClick={ showDescription }>{ info.title }</p>
          <p className="event-description" ref={ descriptionRef }>{ info.description }</p>
        </div>
      </div>
    </div>
  );
}

export default DayBlock;
