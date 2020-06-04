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

const postEvents = (parsedReq, callback) => {

  // eslint-disable-next-line max-len
  const EVENT_INSERT = `INSERT INTO 
  public.vevent(id_editor, id_writer, title, description, place, datetime) 
  VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

  const query = {
    text: EVENT_INSERT,
    value: parsedReq.data,
  };

  pool.query(query.text, query.value, callback);
};

const getEvents = (parsedReq, callback) => {

  let EVENT_SELECT;
  let query;
  // eslint-disable-next-line max-len
  if ((parsedReq.enddate !== undefined) && (parsedReq.startdate !== undefined)) {
    const startDate = parsedReq.startdate;
    const endDate = parsedReq.enddate;

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE datetime >= $1 OR datetime <= $2`;

    query = {
      text: EVENT_SELECT,
      value: [startDate, endDate],
    };
    // eslint-disable-next-line max-len
  } else if ((parsedReq.enddate === undefined) && (parsedReq.startdate !== undefined)) {
    const startDate = parsedReq.startdate;

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE datetime = $1`;

    query = {
      text: EVENT_SELECT,
      value: [startDate],
    };

  } else if (parsedReq.id !== undefined) {
    const Id = parsedReq.id;

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE id_event = $1`;

    query = {
      text: EVENT_SELECT,
      value: [Id],
    };
  }

  pool.query(query.text, query.value, (err, res) => {

    const eventList = res.rows;

    const arr = [[], [], [], [], [], [], []];

    eventList.sort((a, b) => {
      if (a.datetime > b.datetime) {
        return 1;
      }
      if (a.datetime < b.datetime) {
        return -1;
      }
      return 0;
    });

    //04.06.20 00:00:00
    //>
    //04.06.20 3:53:00
    //>
    //05.06.20 00:00:00

    eventList.forEach(elem => {

      console.log(index);
      arr[index].push(elem);
    });

    console.log(eventList);
    console.table(eventList);

    callback(err, eventList);
  });
};


const methods = {
  '/events': {
    GET: getEvents,
    POST: postEvents,
  }
};

const ApiRouting = (parsedReq, callback) => {

  methods[parsedReq.path][parsedReq.method](parsedReq, callback);

};

module.exports = ApiRouting;
