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
	outr.render('intro', c);
});

application.get("/whatareURIs", function(req, out){
	var c = {};
	out.render('uris', c);
});

application.get("/APIintro", function(inr, outr){
	var c = {};
	var requestTwo = function(err, res, body){
		c.priceJSON = body;
		request('http://www.oregonliquorprices.com/api/v1/product/?limit=1', requestThree);
	};

	var requestThree = function(err, res, body){
		c.productJSON = body;
		request('http://www.oregonliquorprices.com/api/v1/store/?limit=1', function(err, res, body){
			c.storeJSON = body;

			if (!err && res.statusCode < 400){
				outr.render('apiintro', c);
			} else {
				outr.render('apiintro',c);
			}
		});
	};


	request('http://www.oregonliquorprices.com/api/v1/price/?limit=1', requestTwo);

});

application.get("/APIprice", function(inr, outr){
	var c = {};
	request('http://www.oregonliquorprices.com/api/v1/price/?limit=1', function(err, res, body){
		c.priceJSON = body;
		if(!err && res.statusCode < 400){
			outr.render('apiprice', c);
		} else {
			outr.render('apiprice', c);
		}
	});
});

application.post("/priEx", function(inr, outr){
	if(inr.body['command'] == "priEx1"){
		request('http://www.oregonliquorprices.com/api/v1/price/', function(err, res, bod){
			var priceJSON = bod;
			if(!err && res.statusCode < 400){
				outr.send(priceJSON);
			} else {
				outr.send("Bad Server Request");
			}
		});

	} else if (inr.body['command'] == "priEx2"){
		request('http://www.oregonliquorprices.com/api/v1/price/?product=579', function(err, res, bod){
			var priceJSON = bod;
			if(!err && res.statusCode < 400){
				outr.send(priceJSON);
			} else {
				outr.send("Bad Server Request");
			}
		});
	} else if (inr.body['command'] == "priEx3"){
		request('http://www.oregonliquorprices.com/api/v1/price/?product=579&limit=1', function(err, res, bod){
			var priceJSON = bod;
			if(!err && res.statusCode < 400){
				outr.send(priceJSON);
			} else {
				outr.send("Bad Server Request");
			}
		});
	} else if (inr.body['command'] == "priEx4"){
		var productNumber = inr.body['productNumber'];
		request('http://www.oregonliquorprices.com/api/v1/price/?product=' + productNumber + '&limit=1', function(err, res, bod){
			var priceJSON = bod;
			if(!err && res.statusCode < 400){
				outr.send(priceJSON);
			} else {
				outr.send("Bad Server Request");
			}
		});

	} else {
		outr.send("Error.");
	}
});

application.get("/APIproduct", function(inr, outr){
	var c = {};
	request('http://www.oregonliquorprices.com/api/v1/product/?limit=1', function(err, res, body){
		c.productJSON = body;
		if(!err && res.statusCode < 400){
			outr.render('apiproduct', c);
		} else {
			outr.render('apiproduct', c);
		}
	});
});

application.post("/proEx", function(inr, outr){
	if(inr.body['command'] == "proEx1"){
		request('http://www.oregonliquorprices.com/api/v1/product/', function(err, res, bod){
			var productJSON = bod;
			if(!err && res.statusCode < 400){
				outr.send(productJSON);
			} else {
				outr.send("Bad Server Request");
			}
		});
	} else if (inr.body['command'] == "proEx2"){
		request('http://www.oregonliquorprices.com/api/v1/product/?code=0674B', function(err, res, bod){
			var productJSON = bod;
			if(!err && res.statusCode < 400){
				outr.send(productJSON);
			} else {
				outr.send("Bad Server Request");
			}
		});
	} else if (inr.body['command'] == "proEx3"){
		request('http://www.oregonliquorprices.com/api/v1/product/?limit=100000', function(err, res, bod){
			var productJSON = bod;
			if(!err && res.statusCode < 400){
				outr.send(productJSON);
			} else {
				outr.send("Bad Server Request");
			}
		});
	} else {
		outr.send("Error.");
	}
});

application.get("/APIstore", function(inr, outr){
	var c = {};
	request('http://www.oregonliquorprices.com/api/v1/store/?limit=1', function(err, res, body){
		c.storeJSON = body;
		if(!err && res.statusCode < 400){
			outr.render('apistore', c);
		} else {
			outr.render('apistore', c);
		}
	});
});

application.post("/stoEx", function(inr, outr){
	if(inr.body['command'] == "stoEx1"){
		request('http://www.oregonliquorprices.com/api/v1/store', function(err, res, bod){
			var storeJSON = bod;
			if(!err && res.statusCode < 400){
				outr.send(storeJSON);
			} else {
				outr.send("Bad Server Request");
			}
		});
	} else if (inr.body['command'] == "stoEx2"){
		request('http://www.oregonliquorprices.com/api/v1/store/?limit=500', function(err, res, bod){
			var storeJSON = bod;
			if(!err && res.statusCode < 400){
				outr.send(storeJSON);
			} else {
				outr.send("Bad Server Request");
			}
		});
	} else {
		outr.send("Error.");
	}
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
