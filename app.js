var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout : 'main'});
//var fortunes = [
//	"Conquer your fears or they will conquer you .",
//	"River need springs.",
//	"Do not fear what you don't know.",
//	"You will hava a pleasant surprese.",
	//"Whenever possoble , keep it simple.",
//];
//添加模板引擎
app.engine('handlebars' , handlebars.engine);
app.set('view engine' , 'handlebars');

app.set('port' , process.env.PORT || 3002);
//添加网页测试
app.use(function(req , res , next){
	res.locals.showTests = app.get('env')!=='production'&&req.query.test==='1';
	next();
});
app.use(express.static(__dirname +'/public'));
//定制404页面
app.get('/' , function(req , res){
	//res.type('text/plain');
	//res.send('FirtTest');
	res.render('home');
});
app.get('/about', function(req , res){
	//框架搭建
	//res.type('text/plain');
	//res.send('About');
	//添加一个随机数组功能
	//var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
	//模块化
	//res.render('about' , {fortune : fortune.getFortune()});
	res.render('about' , {
		fortune : fortune.getFortune(),
		pageTestScript : '/qa/tests-about.js'
	});
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