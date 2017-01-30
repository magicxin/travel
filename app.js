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
//���ģ������
app.engine('handlebars' , handlebars.engine);
app.set('view engine' , 'handlebars');

app.set('port' , process.env.PORT || 3002);
//�����ҳ����
app.use(function(req , res , next){
	res.locals.showTests = app.get('env')!=='production'&&req.query.test==='1';
	next();
});
app.use(express.static(__dirname +'/public'));
//����404ҳ��
app.get('/' , function(req , res){
	//res.type('text/plain');
	//res.send('FirtTest');
	res.render('home');
});
app.get('/about', function(req , res){
	//��ܴ
	//res.type('text/plain');
	//res.send('About');
	//���һ��������鹦��
	//var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
	//ģ�黯
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
//����500ҳ��
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