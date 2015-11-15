var expr = require("express");

var myApp = expr();
var hand = require('express-handlebars').create({defaultLayout:'main'});
var parser = require('body-parser');

myApp.use(parser.urlencoded({ extended: false }));
myApp.use(parser.json());

myApp.engine("handlebars",hand.engine);
myApp.set('view engine', "handlebars");
myApp.set('port', 3001);

myApp.get('/', function(inReq, outRes){
	var myGetArr = [];
	for(var i in inReq.query){
		myGetArr.push({'key':i,'value':inReq.query[i]});
	}
	var c = {};
	c.getData = myGetArr;
	c.get = true;
	c.post = false;
	outRes.render('home', c);
});

myApp.post('/', function(inReq, outRes){
	var myGetArr = [];
	for(var i in inReq.query){
		myGetArr.push({'key':i,'value':inReq.query[i]});
	}
	var c = {};
	c.getData = myGetArr;

	var myPostArr = [];
	for(var i in inReq.body){
		myPostArr.push({'key':i,'value':inReq.body[i]});
	}
	c.postData = myPostArr;
	c.post = true;
	outRes.render('home', c);
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
