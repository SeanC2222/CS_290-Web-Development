var expr = require("express");

var myApp = expr();
var hand = require('express-handlebars').create({defaultLayout:'main'});

myApp.engine("handlebars",hand.engine);
myApp.set('view engine', "handlebars");
myApp.set('port', 3001);

myApp.get('/', function(inReq, outRes){
	outRes.render('home');
});

myApp.get('/sec', function(inReq, outRes){
	outRes.render('alt');
});

myApp.use('/', function(inReq, outRes){
	outRes.status(404);
	outRes.render('404');
});

myApp.use('/', function(err, inReq, outRes, next){
	console.log(err.stack);
	outRes.status(500);
	outRes.render('500');
});

myApp.listen(myApp.get('port'), function(){console.log("Good to go sir.");});
