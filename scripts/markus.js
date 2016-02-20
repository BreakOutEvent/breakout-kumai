var request = require('request');

module.exports = function (robot) {
  robot.hear(/.*bescheid.*/i, function (result) {
    result.send('Bescheid! :blush:');
  });

  robot.hear(/.*der wo.*/i, function (result) {
    result.send('"der wo" ist kein Deutsch :simple_smile:');
  });

  robot.hear(/.*Geeeld.*/, function (result) {
    var text = result.match[0].replace(/\:(.*?)\:/, "");
    if (text == "") return;

    var settings = {
      'text': text,
      'slang': 'de_DE',
      'format': 'json',
      'out_type': 'words',
      'ignore_words_with_numbers': 1,
      'ignore_domain_names': 1
    };
    request({url: 'http://www.webspellchecker.net/web_api_test.php', qs: settings}, function (err, response, body) {
      var obj = JSON.parse(body.substr(4));
      console.log(obj);

      if (!obj.length) return;

      var message = "Es sieht so aus, als würde dein Text Rechtschreibfehler beinhalten :(\nIch habe mir mal erlaubt, deine Nachricht zu verbessern :simple_smile:\n";

      obj.forEach(function (entry) {
        message += "\nDein falsches Wort: *" + entry['word'] + "*\n";
        message += "Vorschläge:\n";


        entry['suggestions'].slice(0, 3).forEach(function (sugg) {
          message += "  - " + sugg + "\n";
        });
      });

      robot.messageRoom(result.message.user.name, message);
    });
  });
};
