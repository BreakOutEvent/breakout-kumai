var request = require('request');

module.exports = function (robot) {
  robot.hear(/.*bescheid.*/i, function (result) {
    result.send('Bescheid! :blush:');
  });

  robot.hear(/.*der wo.*/i, function (result) {
    result.send('"der wo" ist kein Deutsch :simple_smile:');
  });

  robot.hear(/[\s\S]*/, function (result) {
    var text = result.match[0].replace(/\:(.*?)\:/, "");
    if (text == "") return;

    var ignored = [
      'kumai',
      'döner',
      'doni'
    ];

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

      if (!obj.length) return;

      //message += "\n```" + orig_msg + "```\n";

      var message = "";
      var corrected_message = result.match[0];
      obj.forEach(function (entry) {

        if (entry['suggestions'] === undefined || entry['suggestions'].length == 0)
          return;

        if (ignored.indexOf(entry['word'].toLowerCase().trim()) != -1)
          return;

        if (entry['word'].indexOf(':') == 0 && entry['word'].lastIndexOf(':') == entry['word'].length - 1)
          return;
        
        corrected_message = corrected_message.replace(new RegExp('\\b' + entry['word'] + '\\b', 'g'), '*' + entry['suggestions'][0] + '*');

        message += "\nFalsches Wort: *" + entry['word'] + "*\n";
        message += "Vorschläge:\n";


        entry['suggestions'].slice(0, 3).forEach(function (sugg) {
          message += "  - " + sugg + "\n";
        });
      });

      if (message.length != 0) {
        message = "Es sieht so aus, als würde dein Text Rechtschreibfehler beinhalten :(\n" + message;
        message += "\nIch habe versucht, deine Nachricht zu korrigieren, ich hoffe du bist zufrieden damit :simple_smile:\n```" + corrected_message + "```\n";

        robot.messageRoom(result.message.user.name, message);
      }
    });
  });
};
