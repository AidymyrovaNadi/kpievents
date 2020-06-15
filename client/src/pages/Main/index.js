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
        <DayBlock />
        <DayBlock />
      </div>
      <div className='column'>
        <DayBlock />
      </div>
      <div className='column'>
        <DayBlock />
        <DayBlock />
      </div>
    </div>
  );
}

export default Main;
