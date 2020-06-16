'use strict';

const fetch = require('node-fetch');

const getToday = async () => {

  const todayDate = new Date();

  todayDate.setUTCHours(0);
  todayDate.setUTCMinutes(0);
  todayDate.setUTCSeconds(0);

  const response = await fetch(`https://kpievents.herokuapp.com/api/events&startdate=${todayDate.toISOString()}`, {
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
