module.exports = (robot) ->
  robot.hear /.*bier.*/i, (res) ->
    res.send ":beer::beer::beer:"

  robot.hear /.*test.*/i, (res) ->
    res.send ":beer::beer::beer:"

  robot.hear /.*Wer ist kumai(?: senpai)?.*/i, (res) ->
    res.send "Ich bin dein neuer bester Freund :)"

  robot.hear /.*Was ist BreakOut.*/i, (res) ->
    res.send "Dein Leben, Deine Liebe und Deine Zukunft!"

  robot.hear /.*Coden in der Bahn.*/i, (res) ->
    res.send "Ist geil"
