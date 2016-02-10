module.exports = (robot) ->
  robot.hear /.*döner.*/i, (res) ->
    res.send ":doener::doener::doener:"

  robot.hear /.*die IT.*/i, (res) ->
    res.send "Nerds everywhere..."
