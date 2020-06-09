'use strict';

const database = require('./database');
const postEvents = database.postEvents;
const getEvents = database.getEvents;

const methods = {
  '/events': {
    GET: getEvents,
    POST: postEvents,
  }
};

const routeApi = (parsedReq, callback) => {

  methods[parsedReq.path][parsedReq.method](parsedReq, callback);

};

module.exports = routeApi;
