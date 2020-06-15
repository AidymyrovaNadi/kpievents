'use strict';

const fetch = require('node-fetch');

const getToday = async () => {

  const todayDate = new Date();

  todayDate.setUTCHours(0);
  todayDate.setUTCMinutes(0);
  todayDate.setUTCSeconds(0);

  console.log(`http://localhost:8000/api/events&startdate=${todayDate.toISOString()}`);
  const response = await fetch(`http://localhost:8000/api/events&startdate=${todayDate.toISOString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'no-cache',
    referrerPolicy: 'no-referrer',
    credentials: 'same-origin',
  });
  return await response.json();

};


module.exports = getToday;
