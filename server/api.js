'use strict';

const database = require('./database');



const optionsHandler = (parsedReq, callback) => {
  callback(null, null);
};

const methods = {
  '/events': {
    GET: database.getEvents,
    POST: database.postEvents,
    OPTIONS: optionsHandler,
  },
};

const routeApi = (parsedReq, callback) => {

  console.table(
    parsedReq
  );

  try {

    methods[parsedReq.path][parsedReq.method](parsedReq, callback);

  } catch (e) {

    console.log(e.message);

    const error = new Error('Bad request');
    callback(error, null);
  }



};

module.exports = routeApi;
