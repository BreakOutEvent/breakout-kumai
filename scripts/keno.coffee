module.exports = (robot) ->
  robot.hear /.*bier.*/i, (res) ->
    res.send ":beer::beer::beer:"

  robot.hear /.*test.*/i, (res) ->
    res.send ":beer::beer::beer:"
