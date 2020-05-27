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


const ApiRouting = req => {

  const query = req.url.slice(4);

  switch (query) {
  case '/events':
    console.log('events');
    break;
  case '/events/today':
    console.log('today');
    break;
  default:
    console.log('err');
    break;
  }

  return { dbGo: 'brrr brrrr' };
};

module.exports = ApiRouting;
