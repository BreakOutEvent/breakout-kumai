module.exports = function(robot) {
  robot.respond(/.*was macht tino.*/i, function(res){
    res.send('Tino arbeitet intensiv an der Android-App!');
   });
};
