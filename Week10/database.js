var exp = require('express');
var expHan = require('express-handlebars').create({defaultLayout:'main'});
var expSes = require('express-session');
var par = require('body-parser');
var request = require('request');
var mysql = require('mysql');
var myPool = mysql.createPool({
	host: 'localhost',
	user: 'student',
	password: 'default',
	database: 'student'
});

var application = exp();

//Parser
application.use(par.urlencoded({ extended: false }));
application.use(par.json());

//Engine
application.engine('handlebars', expHan.engine);
application.set('view engine', 'handlebars');
application.set('port', 3001);

//Static Directories
application.use('/public/styles', exp.static(__dirname + '/public/styles'));
application.use('/public/scripts', exp.static(__dirname + '/public/scripts'));

//Session
application.use(expSes({secret: "HereIsAnUnguessableString"}));

application.get("/", function(inr, outr){
	var c = {};
	myPool.query("Select * FROM workouts", function(err, rows, fields){
		if (!err){
			c.data = rows;
			for(var i in c.data){
				c.data[i].date = new Date(c.data[i].date);
				var month = c.data[i].date.getMonth() + 1;
				var date = c.data[i].date.getDate();
				if(date < 10){
					date = "0" + date;
				}
				c.data[i].date = c.data[i].date.getFullYear() + '-' + month + '-' + date;
				if(c.data[i].lbs){
					c.data[i].lbs = "lbs";
				} else {
					c.data[i].lbs = "kgs";
				}
			}
			outr.render('home', c);
		} else {
			c.data = "Table error.";
			outr.render('home', c);
		}
	});
});

application.post("/updateData", function(inr, outr){
	if(inr.body['command'] == "INSERT"){
		if(inr.body.name == ""){
			inr.body.name = null;
		}
		myPool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?,?,?,?,?)", 
			     [inr.body.name, parseInt(inr.body.reps), parseInt(inr.body.weight), inr.body.date, inr.body.lbs],
			     function(err, results){
				if(!err){
					outr.send(JSON.stringify({"answer":"S", "id": results.insertId}));
				} else {
					outr.send(JSON.stringify({"answer":"F"}));
				}
			     }
		);

	} else if (inr.body['command'] == "DELETE"){
		myPool.query("DELETE FROM workouts WHERE id=?", [parseInt(inr.body.id)], function(err, results){
			if(!err){
				outr.send(JSON.stringify({"answer":"S"}));
			} else {
				outr.send(JSON.stringify({"answer":"F"}));
			}
		});
	} else if (inr.body['command'] == "UPDATE"){
		myPool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?",
			     [inr.body.name, inr.body.reps, inr.body.weight, inr.body.date, inr.body.lbs, inr.body.id],
			     function(err, results){
				if(!err){
					outr.send(JSON.stringify({"answer":"S"}));
				} else {
					outr.send(JSON.stringify({"answer":"F"}));
				}
			     }
		);
	} else {
		outr.send(JSON.stringify({"answer":"E"}));
	}
});

application.get("/editPage", function(inr, outr){
	var c = {};
	c.id = inr.query.id;
	myPool.query("SELECT * FROM workouts WHERE id=?", [inr.query.id], function(err, result){
		c.date = result[0]['date'];
		var date = new Date(c.date);
		var day = date.getDate();
		if(day < 10){
			day = "0" + day;
		}
		var month = date.getMonth() + 1;
		if(month < 10){
			month = "0" + month;
		};
		var dateString = date.getFullYear() + '-' + month + '-' + day;
		c.date = dateString;
		c.name = result[0]['name'];
		c.weight = result[0]['weight'];
		c.lbs = result[0]['lbs'];
		c.reps = result[0]['reps'];
		outr.render('editPage', c);
	});
});
	
application.get("/reset-table", function(req, out, next){
	var context = {};
	myPool.query("DROP TABLE IF EXISTS workouts", function(err){
		var createString = "CREATE TABLE workouts("+
			"id INT PRIMARY KEY AUTO_INCREMENT," + 
			"name VARCHAR(255) NOT NULL," +
			"reps INT," + 
			"weight INT," + 
			"date DATE," +
			"lbs BOOLEAN)";
		myPool.query(createString, function(err){
			if(!err){
				out.send(JSON.stringify({"answer":"S"}));
			} else {
				out.send(JSON.stringify({"answer":"F"}));
			}
		});
	});
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
