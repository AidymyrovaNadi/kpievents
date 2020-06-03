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

const methods = {
  '/events': {
    GET: () => { console.log('get'); },
    POST: () => { console.log('post'); },
  }
};

const postEvents = (req, callback) => {
  let body = '';

  // eslint-disable-next-line max-len
  const EVENT_INSERT = `INSERT INTO 
  public.vevent(id_editor, id_writer, title, description, place, datetime) 
  VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

  req.on('data', chunk => {
    body += chunk.toString(); // convert Buffer to string
  });

  const query = {
    text: EVENT_INSERT,
    value: JSON.parse(body),
  };

  pool.query(query.text, query.value, callback);
};

const getEvents = (searchParams, callback) => {

  let EVENT_SELECT;
  let query;

  if (searchParams.has('enddate') && searchParams.has('startdate')) {
    const startDate = searchParams.get('startdate');
    const endDate = searchParams.get('enddate');

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE datetime >= $1 OR datetime <= $2`;

    query = {
      text: EVENT_SELECT,
      value: [startDate, endDate],
    };

  } else if (searchParams.has('startdate') && !searchParams.has('enddate')) {
    const startDate = searchParams.get('startdate');

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE datetime >= $1`;

    query = {
      text: EVENT_SELECT,
      value: [startDate],
    };

  } else if (searchParams.has('id')) {
    const Id = searchParams.get('id');

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE id_event = $1`;

    query = {
      text: EVENT_SELECT,
      value: [Id],
    };
  }

  pool.query(query.text, query.value, callback);
};






// const selectByDate = new Map();
//
// selectByDate.set('StartDate', startDate);
// selectByDate.set('EndDate', endDate);
// if (!selectByDate.has('EndDate')) {
//   console.log('Beijing:', selectByDate.get('Beijing'));
// }

const ApiRouting = parsedReq => {

  methods[parsedReq.path][parsedReq.method]();


};

module.exports = ApiRouting;
