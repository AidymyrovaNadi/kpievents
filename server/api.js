'use strict';

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://sclvmlgenafkur:41626924654771cbd114cf5a92c4587db6292ab822b97414fd428c07f426efac@ec2-18-206-84-251.compute-1.amazonaws.com:5432/d61frdr3v14ijh',
  ssl: { rejectUnauthorized: false },
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log(result.rows);
  });
});

const paramsString = '/events&startdate=1999-01-08T04:05:06Z';
const searchParams = new URLSearchParams(paramsString);


// Итерируем параметры поиска.
for (const p of searchParams) {
  console.log(p);
}

// eslint-disable-next-line max-len
const values = ['id_event', 'id_editor', 'id_writer', 'title', 'description', 'place', 'datetime'];

const SelectEvents = searchParams => {

  let result;
  let EVENT_SELECT;
  let query;

  if (searchParams.has('enddate') && searchParams.has('startdate')) {
    const startDate = searchParams.get('startdate');
    const endDate = searchParams.get('enddate');
    EVENT_SELECT = `SELECT ${values.join(', ')} FROM public.vevent WHERE datetime >= $1 OR datetime <= $2`;

    query = {
      text: EVENT_SELECT,
      value: [startDate, endDate],
    };
    // eslint-disable-next-line max-len

    return EVENT_SELECT;

  } else if (searchParams.has('startdate') && !searchParams.has('enddate')) {
    const startDate = searchParams.get('startdate');

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} FROM public.vevent WHERE datetime >= $1`;

    query = {
      text: EVENT_SELECT,
      value: [startDate],
    };
    console.log(typeof startDate);

  } else if (searchParams.has('id')) {
    const Id = searchParams.get('id');

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} FROM public.vevent WHERE id_event = ${Id}`;
    return EVENT_SELECT;
  }

  pool.query(query.text, query.value, (err, res) => {
    if (err) {
      return console.error(err.stack);
    } else {
      result = [];

      for (const row of res.rows) {
        result.push(row);
      }

      console.log(result);
    }
  });

  return result;
};

SelectEvents(searchParams);

module.exports = SelectEvents;




// const selectByDate = new Map();
//
// selectByDate.set('StartDate', startDate);
// selectByDate.set('EndDate', endDate);
// if (!selectByDate.has('EndDate')) {
//   console.log('Beijing:', selectByDate.get('Beijing'));
// }

// const ApiRouting = req => {
//
//   const query = req.url.slice(4);
//   // let result;
//   //
//   // pool.query(EVENT_SELECT, (err, res) => {
//   //   if (err) {
//   //     return console.error(err.stack);
//   //   } else {
//   //     result = [];
//   //
//   //     for (const row of res.rows) {
//   //       result.push(row);
//   //     }
//   //
//   //     console.log(result);
//   //   }
//   // });
//   return result;
// };

