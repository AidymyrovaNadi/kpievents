import React from 'react';
import './index.css';

function DayBlock(props) {
const arr = [
  {
    id_event: 355,
    id_editor: 3,
    id_writer: 1,
    title: 'luctus et ultrices1',
    description: 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    place: 'Navegantes',
    datetime: '2020-06-23T10:30:00.000Z'
  },
  {
    id_event: 355,
    id_editor: 3,
    id_writer: 1,
    title: 'luctus et ultrices2',
    description: 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    place: 'Navegantes',
    datetime: '2020-06-23T10:30:00.000Z'
  },
  {
    id_event: 355,
    id_editor: 3,
    id_writer: 1,
    title: 'luctus et ultrices3',
    description: 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    place: 'Navegantes',
    datetime: '2020-06-23T10:30:00.000Z'
  },
  {
    id_event: 355,
    id_editor: 3,
    id_writer: 1,
    title: 'luctus et ultrices4',
    description: 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    place: 'Navegantes',
    datetime: '2020-06-23T10:30:00.000Z'
  }

]

  const descriptionRef = React.createRef()
  let date = new Date(arr[0].datetime)
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
      {
        arr.map( (item, i) => {
          date = new Date(item.datetime)
          return (
            <div className="event-container" key={i}>
              <p className="event-time-default">{ `${date.getHours()}:${date.getMinutes()}` }</p>
              <div className="event-info">
                <p className="event-type-text">{ item.place }</p>
                <p className="event-default-text" onClick={ showDescription }>{ item.title }</p>
                <p className="event-description" ref={ descriptionRef }>{ item.description }</p>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default DayBlock;
