import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import DayBlock from '../../components/DayBlock';

function Main() {
  return (
    <div className="main">
      <div className='column'>
        <DayBlock />
      </div>
      <div className='column'>
        <DayBlock />
      </div>
      <div className='column'>
        <DayBlock />
      </div>
    </div>
  );
}

export default Main;
