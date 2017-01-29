var fortuneCookies = [
	"Conquer your fears or they will conquer you .",
	"River need springs.",
	"Do not fear what you don't know.",
	"You will hava a pleasant surprese.",
	"Whenever possoble , keep it simple.",
];

exports.getFortune = function(){
	var idx = Math.floor(Math.random()*fortuneCookies.length);
	return fortuneCookies[idx];
}