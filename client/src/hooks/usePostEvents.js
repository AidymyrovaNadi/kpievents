import useFetch from './useFetch';

const usePostEvents = (event) => {

  const url = `http://localhost:8000/api/events`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'no-cache',
    referrerPolicy: 'no-referrer',
    credentials: 'same-origin',
    body: JSON.stringify(event),
  }

  return useFetch(url, options);
}

export default usePostEvents
