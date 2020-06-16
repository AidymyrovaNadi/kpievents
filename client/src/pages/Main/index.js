import React from 'react';
import './index.css';
import DayBlock from '../../components/DayBlock';
import useFetchEvents from '../../hooks/useFetchEvents';

function Main() {

  const events = useFetchEvents()

  if (!events.response) {
    return <div className="loader"><span>Завантажуемо...</span></div>;
  }

  const inputArr = events.response;

  let firstColumn = [];
  let secondColumn = [];
  let thirdColumn = [];

  inputArr.forEach((item, i) => {

    if ((i % 3) === 0) {
      firstColumn.push(item);
    } else if ((i % 3) === 1) {
      secondColumn.push(item);
    } else if ((i % 3) === 2) {
      thirdColumn.push(item);
    }

  });

  return (
    <div className="main">
      <div className='column'>
        {
          firstColumn.map( (item, i) => (
            <DayBlock info={item} key={i}/>
          ))
        }
      </div>
      <div className='column'>
        {
          secondColumn.map( (item, i) => (
            <DayBlock info={item} key={i}/>
          ))
        }
      </div>
      <div className='column'>
        {
          thirdColumn.map( (item, i) => (
            <DayBlock info={item} key={i}/>
          ))
        }
      </div>
    </div>
  );
}

export default Main;
