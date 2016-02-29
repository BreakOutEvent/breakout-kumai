/**
 * Created by Keno on 19.02.2016.
 */

var API = require('../helpers/backend-api.js');
var request = require('request');


module.exports = function (robot) {

  robot.respond(/Wer ist in Team (\d+)/i, function (res) {
    var teamnr = res.match[1];

    API.getModel('event')
      .then(function (events) {
        if (events.length > 0) {
          API.getTeam(events[0].id, teamnr)
            .then(function (team) {
              res.send(team);
            })
            .catch(function (err) {
              res.send(err.error);
            });
        }
      });
  });

  robot.respond(/AddFeature (.+)/, function (res) {
    console.log(res.match[1]);
    var token = process.env.HUBOT_GITHUB_TOKEN;

    request
      .post({
        url: 'https://api.github.com/repos/BreakOutEvent/breakout-kumai/issues',
        headers: {
          'content-type': 'application/json',
          'Authorization':'token ' + token,
          'User-Agent':'BreakOut-Feature-Requester'
        },
        body: JSON.stringify({
          title: res.match[1]
        })
      }, function (err, response, body) {
        if (response.statusCode === 201) {
          var json = JSON.parse(body);
          res.send('Feature Request erstellt: ' + json.html_url);
        } else {
          res.send(response.statusCode + ', ' + err + ',' + body);
        }
      });

  });
};

