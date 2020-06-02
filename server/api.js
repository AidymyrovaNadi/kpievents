'use strict';

const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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

// eslint-disable-next-line max-len
const values = ['id_event', 'id_editor', 'id_writer', 'title', 'description', 'place', 'datetime'];

const SelectEvents = (searchParams, callback) => {

  let EVENT_SELECT;
  let query;

  if (searchParams.has('enddate') && searchParams.has('startdate')) {
    const startDate = searchParams.get('startdate');
    const endDate = searchParams.get('enddate');

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} FROM public.vevent WHERE datetime >= $1 OR datetime <= $2`;

    query = {
      text: EVENT_SELECT,
      value: [startDate, endDate],
    };

  } else if (searchParams.has('startdate') && !searchParams.has('enddate')) {
    const startDate = searchParams.get('startdate');

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} FROM public.vevent WHERE datetime >= $1`;

    query = {
      text: EVENT_SELECT,
      value: [startDate],
    };

  } else if (searchParams.has('id')) {
    const Id = searchParams.get('id');

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} FROM public.vevent WHERE id_event = $1`;

    query = {
      text: EVENT_SELECT,
      value: [Id],
    };
  }

  pool.query(query.text, query.value, callback);
};

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
//   // return result;
// };

