'use strict';

var request = require('request');

var config = require('../config/api.json');
var url = config.protocol + '://' + config.URL;

var API = {};


API.authenticate = function (username, password) {
  return new Promise(function (resolve, reject) {
    request
      .post({
        'url': url + '/oauth/token',
        qs: {
          client_id: config.clientID,
          client_secret: config.clientSecret,
          username: username,
          password: password,
          grant_type: 'password'
        },
        auth: {
          'user': config.clientID,
          'pass': config.clientSecret
        }
      }, handleResponse(resolve, reject));
  });
};

API.getCurrentUser = function (token) {
  return new Promise(function (resolve, reject) {
    request
      .get({
        url: url + '/me/',
        auth: {
          bearer: token.access_token
        }
      }, handleResponse(resolve, reject));
  });
};

API.getModel = function (modelName, token, id) {
  if (!id) {
    id = '';
  } else {
    id = id + '/';
  }
  var auth = null;
  if(token) {
    auth = {
      'bearer' : token.access_token
    }
  }
  return new Promise(function (resolve, reject) {
    request
      .get({
        url: url + '/' + modelName + '/' + id,
        auth: auth
      }, handleResponse(resolve, reject));
  });
};

API.postModel = function (modelName, token, body) {
  return new Promise(function (resolve, reject) {
    request
      .post({
        url: url + '/' + modelName + '/',
        auth: {
          'bearer': token.access_token
        },
        body: JSON.stringify(body),
        headers: {'content-type': 'application/json'}
      }, handleResponse(resolve, reject));
  });
};

API.putModel = function (modelName, id, token, body) {
  return new Promise(function (resolve, reject) {
    if(!id) {
      reject({error_description: 'No ID specified'});
      return;
    }
    request
      .post({
        url: url + '/' + modelName + '/' + id,
        auth: {
          bearer: token.access_token
        },
        body: JSON.stringify(body)
      }, handleResponse(resolve, reject));
  });
};

API.delModel = function (modelName, token, id) {
  return new Promise(function (resolve, reject) {
    if(!id) {
      reject({error_message: 'No ID specified'});
      return;
    }
    request
      .del({
        url: url + '/' + modelName + '/' + id,
        auth: {
          bearer: token.access_token
        }
      }, handleResponse(resolve, reject));
  });
};

API.createUser = function (email, password) {
  return new Promise(function (resolve, reject) {
    request
      .post({
        url: url + '/user/',
        auth: {
          user: config.clientID,
          pass: config.clientSecret
        },
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
      }, handleResponse(resolve, reject));
  });
};

API.getTeam = function(eventID, teamID) {
  return new Promise(function (resolve, reject) {
    request
      .get({
        url: url + '/event/' + eventID + '/team/' + teamID + '/'
      }, handleResponse(resolve, reject));
  });
};

function handleResponse(resolve, reject) {
  return function (error, response, body) {
    if (error) {
      throw error;
    } else {
      if (response.statusCode.toString().match(/^2\d\d$/)) {
        resolve(JSON.parse(body));
      } else {
        reject(JSON.parse(body));
      }
    }
  };
}
module.exports = API;
