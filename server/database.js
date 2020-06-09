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
const eventsArr = [[], [], [], [], [], [], []];

const sortEvents = (err, res) => {
  const eventList = res.rows;

  // исправить
  eventList.forEach(elem => {
    const fromDate = new Date(elem.datetime);
    fromDate.setHours(0);
    fromDate.setMinutes(0);
    fromDate.setSeconds(0);

    const toDate = new Date(fromDate);
    toDate.setDate((fromDate.getDate()) + 1);
    const eventDay = elem.datetime.getDay();

    // eslint-disable-next-line max-len
    if ((elem.datetime > fromDate) && (elem.datetime < toDate)) {
      if (eventDay !== 0) eventsArr[eventDay - 1].push(elem);
      else eventsArr[6].push(elem);
    }
  });

  console.log(eventsArr);
  //console.table(eventList);
  // callback(err, eventList);
  return eventsArr;
};

const postEvents = (parsedReq, callback) => {
  let error = null;
  if (parsedReq.data === null) {
    error = new Error('Дай данных, брат.');
    callback(error, null);
  } else {
    // eslint-disable-next-line max-len
    const EVENT_INSERT = `INSERT INTO 
    public.vevent(id_editor, id_writer, title, description, place, datetime) 
    VALUES($1, $2, $3, $4, $5, $6) RETURNING * ORDER BY datetime`;

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

  // eslint-disable-next-line max-len
  if ((parsedReq.enddate !== undefined) && (parsedReq.startdate !== undefined)) {
    const startDate = parsedReq.startdate;
    const endDate = parsedReq.enddate;

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE datetime BETWEEN $1 AND $2 ORDER BY datetime`;

    query = {
      text: EVENT_SELECT,
      value: [startDate, endDate],
    };
    // eslint-disable-next-line max-len
  } else if ((parsedReq.startdate === undefined) && (parsedReq.endid !== undefined)) {
    const startDate = parsedReq.startdate;
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);

    const nextDate = new Date(startDate);
    nextDate.setDate((startDate.getDate()) + 1);

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE datetime WHERE $1 AND $2 ORDER BY datetime`;

    query = {
      text: EVENT_SELECT,
      value: [startDate, nextDate],
    };

  } else if ((parsedReq.id !== undefined) && (parsedReq.endid === undefined)) {
    const Id = parsedReq.id;

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE id_event = $1 ORDER BY datetime`;

    query = {
      text: EVENT_SELECT,
      value: [Id],
    };
  } else if ((parsedReq.startid !== undefined) && (parsedReq.endid !== undefined)) {
    const startId = parsedReq.startid;
    const endId = parsedReq.endid;

    // eslint-disable-next-line max-len
    EVENT_SELECT = `SELECT ${values.join(', ')} 
    FROM public.vevent WHERE id_event BETWEEN $1 AND $2 ORDER BY datetime`;

    query = {
      text: EVENT_SELECT,
      value: [startId, endId],
    };
  } else {
    error = new Error('Incorrect parameters. Try again.');
    callback(error, null);
  }

  pool.query(query.text, query.value, (err, res) => {
    const eventList = sortEvents(err, res);
    callback(err, eventList);
  });
};

module.exports = { postEvents, getEvents, eventsArr };
