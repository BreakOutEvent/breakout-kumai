module.exports = function(robot) {
  robot.hear(/.*was macht tino.*/i, function(res){
    res.send('Tino arbeitet intensiv an der Android-App!');
   });
};
    