/*global module*/
var pizzaVariants = ['Margherita', 'Tonno', 'Diavolo', 'Fleisch'];
var delayed = function(res, msg, delay){
  setTimeout(function(){
    res.send(msg);
  }, delay);
};

module.exports = function(robot) {
  robot.hear(/.*hunger.*/i, function(res){
    res.send('Rufe Pizza Blitz...');
    delayed(res, 'Bestelle Pizza ' + pizzaVariants[Math.floor(Math.random()*pizzaVariants.length)], 1000);
    delayed(res, 'Bestellung erfolgreich!', 3000);
   });
};
    