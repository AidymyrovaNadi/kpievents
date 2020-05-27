import React from 'react';
import {BrowserRouter as Router, Route,} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import App2 from './App2';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path='/' exact component={App}/>
      <Route path='/sec' exact component={App2}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
