import useFetch from './useFetch';
import { useEffect, useState } from 'react';

const useFetchEvents = () => {

  const startDate = new Date();
  startDate.setUTCHours(0);
  startDate.setUTCMinutes(0);
  startDate.setUTCSeconds(0);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);

  const url = `http://localhost:8000/api/events&startdate=${startDate.toISOString()}&enddate=${endDate.toISOString()}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'no-cache',
    referrerPolicy: 'no-referrer',
    credentials: 'same-origin',
  }

  return useFetch(url, options);
}

export default useFetchEvents
