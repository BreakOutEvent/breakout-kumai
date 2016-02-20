helpers = require "./helpers"

module.exports = (robot) ->
  robot.hear /.*@tino.*/i, (res) ->
    array = ["Tino wird beim Rückwärtszählen schwindelig.","Tino hat noch nie in seinem Leben Unterwäsche getragen","Tino war einmal für 2 Monate im Koma und weiß es bis heute nicht."]
    res.send "Fun fact: "+array[Math.floor(Math.random() * (2))]

  robot.hear /.*max*/i,(res) ->
     res.send "Max lässt mich gerade auf viele verschiedene Sätze reagieren! Was für ein Genie!"