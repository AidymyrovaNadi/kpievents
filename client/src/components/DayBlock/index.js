import React from 'react';
import './index.css';

function DayBlock(props) {
  let date = new Date(props.info[0].datetime)
  const days = ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"]

  const showDescription = (e) => {
    const elements = e.target.parentNode.childNodes
    const style = elements[elements.length-1].style
    style.display === "flex" ? style.display = "none" : style.display = "flex"
  }

  return (
    <div className="day-block">
      <div className="event-date-container">
        <p className="date-style">{ date.toLocaleDateString("ru-RU") }</p>
      </div>

      <p className="week-style">{ days[date.getDay()] }</p>
      {
        props.info.map( (item, i) => {
          date = new Date(item.datetime)
          return (
            <div className="event-container" key={i}>
              <p className="event-time-default">{ date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) }</p>
              <div className="event-info">
                <p className="event-type-text">{ item.place }</p>
                <div className="event-additional-info">
                  <p className="event-default-text" onClick={ showDescription }>{ item.title }</p>
                  <p className="event-description">{ item.description }</p>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default DayBlock;
