import React from 'react';
import './index.css';
// import { Link } from 'react-router-dom';
import DayBlock from '../../components/DayBlock';
import useFetchEvents from '../../hooks/useFetchEvents';

function Main() {

  const events = useFetchEvents()

  if (!events.response) {
    return <div>Loading...</div>;
  }

  const arr = events.response;
  console.log(arr)

  return (
    <div className="main">
      <div className='column'>
        <DayBlock info={arr[0]}/>
        <DayBlock info={arr[3]}/>
      </div>
      <div className='column'>
        <DayBlock info={arr[1]}/>
        <DayBlock info={arr[4]}/>
      </div>
      <div className='column'>
        <DayBlock info={arr[2]}/>
        <DayBlock info={arr[5]}/>
      </div>
    </div>
  );
}

export default Main;
