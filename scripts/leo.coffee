helpers = require "./helpers"
ical = require "ical"

module.exports = (robot) ->
  robot.hear /.*iOS.*/i, (res) ->
    res.send "Hey!!! Hab ich iOS gehört?! Wir suchen da immer noch gute Entwickler ;)"

  robot.hear /.*aktuell|stand|apps.*/i, (res) ->
    res.send "Deine Mudda is ne App!!! Maaaaaaaaan, einmal die Füße stillhalten hier!!!!"

  robot.hear /.*Nächstes Event?.*/i, (res) ->
    ical.fromURL 'https://teamweek.com/api/v3/sharing/z2kwvpps38rgtj0pwq19/icalendar', {}, (err, data) ->
      for k of data
        if data.hasOwnProperty(k)
          event = data[k]
          if event.summary!=undefined and event.start!=undefined and event.end!=undefined
            res.send event.summary 
            res.send "von: " + event.start + " bis: " + event.end
      return


  robot.listen(
    (message) -> # Match function
      # Occassionally respond to things that Steve says
      message.user.name is "Leo" and Math.random() > 0.8
    (response) -> # Standard listener callback
      # Let Steve know how happy you are that he exists
      response.reply "Hey mein schnuckelchen ;)"
  )
    

  robot.hear /.*(@[a-z1-9]*) und (@[a-z1-9]*).*/i, (res) ->
    firstName = res.match[1]
    secondName = res.match[2]

    firstName = firstName.slice(1, firstName.length)
    secondName = secondName.slice(1, secondName.length)

    helpers.isMale firstName, (err1, firstGender) ->
      helpers.isMale secondName, (err2, secondGender) ->
        isCouple = ((firstGender && !secondGender) ||(!firstGender && secondGender))
        if isCouple
          res.send "Uuhh ist da wohl ein BreakOut Baby in Arbeit?"
