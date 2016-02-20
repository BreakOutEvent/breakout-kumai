/**
 * Created by Keno on 19.02.2016.
 */

var API = require('../helpers/backend-api.js');


module.exports = function (robot) {

  robot.hear(/.*Wer ist in Team (\d+)/i, function (res) {
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
      })
      .catch(function (err) {
        res.send(err);
      })
  });
};

