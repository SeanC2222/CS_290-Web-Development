var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyparse = require('body-parser');
var exec = require('child_process').execFile;
var child;

/*
child.stdout.on('data', function(data){
	console.log(data);
});

process.stdin.on('data', function(data){
	child.stdin.write(data, function(){
		console.log("Written to child");
	});
});

child.on('close', function(code){
	console.log("exited with code: ", code);
});
*/

//Application
var app = express();

//Set View Engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Body Parser
app.use(bodyparse.urlencoded({ extended: false}));
app.use(bodyparse.json());

//Static Directories
app.use('/public/documents', express.static(__dirname + '/public/documents'));
app.use('/public/scripts', express.static(__dirname + '/public/scripts'));
app.use('/public/styles', express.static(__dirname + '/public/styles'));
app.use('/public/execs', express.static(__dirname + '/public/execs'));
//Set App Port
app.set('port', process.env.PORT || 3000);

//find new session ID generator
//app.use(session({secret: 'L4fk5OPc34'}));
app.get('/', function(req, res){
	var options = [];
	var context = {};
	context.barOption = options;
	res.render('home', context);
});

app.get('/Coliseum', function(req, res){
	var options = [];
	var context = {};
	res.render('coliseum', context);
});

app.post('/ColiseumIO', function(req, res){
	console.log(req.body);
	var input = req.body['INPUT'];
	var rText = "";
	if(input == "START"){
		child = exec('./public/execs/Coliseum');
		child.stdout.on('data', function(data){
			rTest += data;
			child.stdout.pause();
		});
		
		child.stdout.on('error', function(error){
			console.log("ERROR");
		});
	} else if (input == "COMMAND"){
		child.stdin.write(req.body['COMMAND']);
	} else {
		res.send("FAILURE");
	}
});

app.use(function(req, res, next){
        res.type('text/plain');
        res.status(404);
        res.send('404 - There is nothing here save for vast expanses of nothing'                                                       );
});

app.use(function(err, req, res, next){
	res.type('text/plain');
	res.status(500);
	res.send('500 - I made a huge mistake');
});

app.listen(app.get('port'), function(){
        console.log( 'Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to exit' );
});

