var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyparse = require('body-parser');

var session = require('express-session');

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use('/public/styles', express.static(__dirname + '/public/styles'));
app.use('/public/scripts', express.static(__dirname + '/public/scripts'));
app.set('port', process.env.PORT || 80);

app.use(session({secret: 'L4fk5OPc34'}));

app.get('/', function(req, res){
	var options = [];
	var context = {};
	context.barOption = options;
	res.render('home', context);
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
        console.log( 'Express started on http://localhost:' + app.get('port') +                                                        ' press Ctrl-C to exit' );});


