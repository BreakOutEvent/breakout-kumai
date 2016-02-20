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
  
  robot.hear(/([A-Z]+\s){3,}/, function(res){
    var userName = res.message.user.name;
    res.send('Hey ${name}, Zeit fuer eine Mikropause. Setze dich erstmal aufrecht hin. Lege deine Haende auf die Oberschenkel und jetzt... Tief einatmen... halten... und ausatmen! Einatmen.... halten... Ausatmen. Und jetzt wieder ab an die Arbeit! BreakOut programmiert sich nicht von alleine!');
  });
};
    