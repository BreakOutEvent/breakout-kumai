module.exports = (robot) ->
  robot.hear /.*döner.*/i, (res) ->
    res.send ":doener::doener::doener:"
