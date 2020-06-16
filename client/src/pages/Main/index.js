import React from 'react';
import './index.css';
// import { Link } from 'react-router-dom';
import DayBlock from '../../components/DayBlock';
import useFetchEvents from '../../hooks/useFetchEvents';

function Main() {

  const events = useFetchEvents()
  return (
    <div className="main">
      <div className='column'>
        <DayBlock info={events[0]}/>
        <DayBlock info={events[3]}/>
      </div>
      <div className='column'>
        <DayBlock info={events[1]}/>
        <DayBlock info={events[4]}/>
        <DayBlock info={events[6]}/>
      </div>
      <div className='column'>
        <DayBlock info={events[2]}/>
        <DayBlock info={events[5]}/>
      </div>
    </div>
  );
}

export default Main;
