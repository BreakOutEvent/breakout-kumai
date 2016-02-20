var request = require('request');

module.exports = function (robot) {
  robot.hear(/.*bescheid.*/i, function (result) {
    result.send('Bescheid! :blush:');
  });

  robot.hear(/.*der wo.*/i, function (result) {
    result.send('"der wo" ist kein Deutsch :simple_smile:');
  });

  robot.hear(/.*/, function (result) {
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

      if (!obj.length) return;

      var message = "Es sieht so aus, als würde dein Text Rechtschreibfehler beinhalten :(\nIch habe mir mal erlaubt, deine Nachricht zu verbessern :simple_smile:\n";

      if(result.match[0].startsWith("kumai "))
        var orig_msg = result.match[0].substr(6);
      else
        var orig_msg = result.match[0];

      message += "\n```" + orig_msg + "```\n";

      var corrected_message = result.match[0];
      obj.forEach(function (entry) {
        message += "\nFalsches Wort: *" + entry['word'] + "*\n";
        message += "Vorschläge:\n";


        entry['suggestions'].slice(0, 3).forEach(function (sugg) {
          message += "  - " + sugg + "\n";
        });

         corrected_message = corrected_message.replace(" " + entry['word'] + " ", " *" + entry['suggestion'][0] + "* ");
      });

      message += "\nIch habe versucht, deine Nachricht zu korrigieren, ich hoffe du bist zufrieden damit :)\n```" + corrected_message + "```\n";

      robot.messageRoom(result.message.user.name, message);
    });
  });
};
