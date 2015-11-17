var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyparse = require('body-parser');

var session = require('express-session');

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use('/public/styles', express.static(__dirname + '/public/styles'));
app.set('port', process.env.PORT || 3000);

app.use(session({secret: 'L4fk5OPc34'}));

app.get('/', function(req, res){
	res.render('home');
});

app.use(function(req, res, next){
        res.type('text/plain');
        res.status(404);
        res.send('404 - There is nothing here save for vast expanses of nothing'                                                       );
});

app.listen(app.get('port'), function(){
        console.log( 'Express started on http://localhost:' + app.get('port') +                                                        ' press Ctrl-C to exit' );});


