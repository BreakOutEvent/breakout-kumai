request = require "request"

module.exports.is_male = (msg, cb) ->
  try
    name = msg.message.user.slack.profile.first_name
  catch err
    cb err, null
  request "https://api.genderize.io/?name=#{name}", (err, res, body) ->
    cb err if err
    gender_string = JSON.parse(body).gender
    is_male = (gender_string == "male")
    cb null, is_male

# Example usage:
#  helpers.is_male msg, (err, is_male) ->
#    msg.send "Motherfucker" if is_male
