'use strict';

const database = require('./database');

const methods = {
  '/events': {
    GET: database.getEvents,
    POST: database.postEvents,
  }
};

const routeApi = (parsedReq, callback) => {

  methods[parsedReq.path][parsedReq.method](parsedReq, callback);

};

module.exports = routeApi;
