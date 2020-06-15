import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';

import './index.css';

import Logo from '../src/img/logo.png';

import Main from './pages/Main';
import Edit from './pages/Edit';

ReactDOM.render(
  <React.StrictMode>
    <div className='header'>
      <img src={Logo}/>
    </div>
    <div className='content'>
      <Router>
        <Route path='/' exact component={Main}/>
        <Route path='/edit' exact component={Edit}/>
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

