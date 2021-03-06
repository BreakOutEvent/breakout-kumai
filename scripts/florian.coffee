helpers = require "./helpers"
util = require "util"

module.exports = (robot) ->
  robot.respond /.*döner.*/i, (res) ->
    res.send ":doener::doener::doener:"

  robot.respond /.*die IT.*/i, (res) ->
    res.send "Nerds everywhere..."

  robot.respond /.*(@[a-z1-9]*) und (@[a-z1-9]*).*/i, (res) ->
    firstName = res.match[1]
    secondName = res.match[2]

    firstName = firstName.slice(1, firstName.length)
    secondName = secondName.slice(1, secondName.length)

    helpers.isMale firstName, (err1, firstGender) ->
      helpers.isMale secondName, (err2, secondGender) ->
        isCouple = ((firstGender && !secondGender) ||(!firstGender && secondGender))
        if isCouple
          res.send "Uuhh ist da wohl ein BreakOut Baby in Arbeit?"
