var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout : 'main'});
var fortunes = [
	"Conquer your fears or they will conquer you .",
	"River need springs.",
	"Do not fear what you don't know.",
	"You will hava a pleasant surprese.",
	"Whenever possoble , keep it simple.",
];

app.engine('handlebars' , handlebars.engine);
app.set('view engine' , 'handlebars');

app.set('port' , process.env.PORT || 3002);
app.use(express.static(__dirname +'/public'));
//定制404页面
app.get('/' , function(req , res){
	//res.type('text/plain');
	//res.send('FirtTest');
	res.render('home');
});
app.get('/about', function(req , res){
	//res.type('text/plain');
	//res.send('About');
	var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
	res.render('about' , {fortune : randomFortune});
});
app.use(function(req , res){
	//res.type('text/plain');
	res.status(404);
	res.render('404');
	//res.send('404-NotFound');
});
//定制500页面
app.use(function(err , req , res , next){
	console.error(err.stack);
	//res.type('text/plain');
	res.status(500);
	//res.send('500-ServerError');
	res.render('500');
});

app.listen(app.get('port') , function(){
	console.log('Express started on http://13.199.168.15:' + app.get('port') + ';pressCtrl-C to terminate.');
});