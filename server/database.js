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


const sortEvents = (err, res) => {
  const eventList = res.rows;
  const eventsArr = [];
  let bufferArr = [];

  const fromDate = new Date(eventList[0].datetime);
  fromDate.setHours(0);
  fromDate.setMinutes(0);
  fromDate.setSeconds(0);

  eventList.forEach(elem => {

    const toDate = new Date(fromDate);
    toDate.setDate((fromDate.getDate()) + 1);

    if ((elem.datetime >= fromDate) && (elem.datetime <= toDate)) {
      bufferArr.push(elem);
    } else {
      eventsArr.push(bufferArr);
      bufferArr = [];
      fromDate.setDate(elem.datetime.getDate());
      bufferArr.push(elem);
    }
  });

  return eventsArr;
};

const postEvents = (parsedReq, callback) => {
  let error = null;
  if (parsedReq.data === null) {
    error = new Error('No data to insert.');
    callback(error, null);
  } else {
    // eslint-disable-next-line max-len
    const EVENT_INSERT = `INSERT INTO 
    public.vevent(id_editor, id_writer, title, description, place, datetime) 
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

    const query = {
      text: EVENT_INSERT,
      value: parsedReq.data,
    };

    pool.query(query.text, query.value, callback);
  }
};

const getEvents = (parsedReq, callback) => {

  let EVENT_SELECT;
  let query;
  let error = null;

  if ((parsedReq.enddate) && (parsedReq.startdate)) {
    const startDate = parsedReq.startdate;
    const endDate = parsedReq.enddate;

    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE datetime BETWEEN $1 AND $2 ORDER BY datetime`;

    query = {
      text: EVENT_SELECT,
      value: [startDate, endDate],
    };

    pool.query(query.text, query.value, (err, res) => {
      const eventList = sortEvents(err, res);
      callback(err, eventList);
    });

  } else if (!(parsedReq.enddate) && (parsedReq.startdate)) {
    const startDate = new Date(parsedReq.startdate);
    startDate.setUTCHours(0);
    startDate.setUTCMinutes(0);
    startDate.setUTCSeconds(0);

    const nextDate = new Date(startDate);
    nextDate.setDate((startDate.getDate()) + 1);

    EVENT_SELECT = `SELECT ${values.join(', ')}
    FROM public.vevent WHERE datetime BETWEEN $1 AND $2 ORDER BY datetime`;

    query = {
      text: EVENT_SELECT,
      value: [startDate, nextDate],
    };

    pool.query(query.text, query.value, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        const eventsArr = [];
        for (const row of res.rows) {
          eventsArr.push(row);
        }
        callback(err, eventsArr);
      }
    });

  } else if (parsedReq.id) {
    const Id = parsedReq.id;

    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE id_event = $1`;

    query = {
      text: EVENT_SELECT,
      value: [Id],
    };

    pool.query(query.text, query.value, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        const eventsArr = [];
        for (const row of res.rows) {
          eventsArr.push(row);
        }
        callback(err, eventsArr);
      }
    });

  } else if ((parsedReq.startid) && (parsedReq.endid)) {
    const startId = parsedReq.startid;
    const endId = parsedReq.endid;

    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE id_event BETWEEN $1 AND $2 ORDER BY id_event`;

    query = {
      text: EVENT_SELECT,
      value: [startId, endId],
    };

    pool.query(query.text, query.value, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        const eventsArr = [];
        for (const row of res.rows) {
          eventsArr.push(row);
        }
        callback(err, eventsArr);
      }
    });

  } else {
    error = new Error('Incorrect parameters. Try again.');
    callback(error, null);
  }
};

module.exports = { postEvents, getEvents };
