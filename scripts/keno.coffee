module.exports = (robot) ->
  robot.hear /.*bier.*/i, (res) ->
    res.send ":beer::beer::beer:"
