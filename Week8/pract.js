var exp = require('express');
var expHan = require('express-handlebars').create({defaultLayout:'main'});
var expSes = require('express-session');
var par = require('body-parser');
var request = require('request');

var application = exp();

//Parser
application.use(par.urlencoded({ extended: false }));
application.use(par.json());

//Engine
application.engine('handlebars', expHan.engine);
application.set('view engine', 'handlebars');
application.set('port', 3050);

//Static Directories
application.use('/public/styles', exp.static(__dirname + '/public/styles'));
application.use('/public/scripts', exp.static(__dirname + '/public/scripts'));

//Session
application.use(expSes({secret: "HereIsAnUnguessableString"}));

application.get("/", function(inr, outr){
	var c = {};
	c.count = inr.session.count || 0;
	inr.session.count = c.count + 1;
	c.array = inr.session.array || {"one":"1", "two":"2", "three":{"d2":"deepest"}};

	inr.session.array = c.array;

	console.log(inr.session.array);
	request("http://api.openweathermap.org/data/2.5/weather?zip=98109&appid=d7180a5699f76800b1b2dab8b18638ee", function(err, myRes, myBody){
		if (!err && myRes.statusCode >= 200 && myRes.statusCode < 400){
			c.weather = myRes.body;
			request({"url": "http://httpbin.org/post", "method":"POST", "headers":{"Content-Type":"application/json"},"body":c.weather}, function(err, myRes, myBody){
				if(!err && myRes.statusCode < 400){
					console.log(myBody);
					c.weather = myBody;
					outr.render('home', c);
				}
			});
				
		} else {
			if(myRes){
				console.log(response.statusCode);
			}
			next(err);
			
		}
	});
});

application.get("/testGet", function(req, out){
	var c = {};
	c.weather = "Test get worked great";
	out.render('home', c);
});

application.use("/", function(inr, outr){
	outr.status(404);
	outr.render('404');
});

application.use("/", function(err, inr, outr, next){
	console.log(err.stack);
	outr.status(500);
	outr.render('500');
});

application.listen(application.get('port'), function(){console.log("Up and running on port: " + application.get('port'));});
