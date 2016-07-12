/***
	Keep disabled until major rewrite has gone under way



***/

var Command = require('./Command.js');
var grabTokens = require('../helpers/grabTokens.js');
var greetings = "hello|hi|hey|yo|morning|afternoon|evening";
var wantSomething = /(\w+) (want|wants) ([^.&^\n]+)/i;
var happy = "yay|woo|yess|:D|:\\)"
var url = "link|url";

var condition = function(text) {

}
module.exports = new Command("NaturalSpeech", condition, function(text, send, extra) {
	var from = extra.from || "";
	var privateMessage = extra.privateMessage || false;
	var tokens = grabTokens(text);
	/*
		Link to codeshare
	*/
	if (new RegExp(url).test(text) && tokens.contain("codeshare")) {
		send("https://hidden-ocean-8102.herokuapp.com/");
	}
	/*
		:( -> It's okay.
	*/
	else if (tokens.contain(":(")) {
		send("It's okay");
	} 
	/*
		thank you -> You're welcome :)
	*/
	else if (tokens.superContain("thank") && (tokens.superContain("rozbot") || privateMessage)) {
		send("You're welcome :)");
	} 
	/*
		rozbot? -> Yes?
	*/
	else if (text.toLowerCase() === "rozbot?") {
		send("Yes?");
	} 
	/*
		Hugs rozbot -> Rozbot hugs [user]
	*/
	else if ((tokens.superContain("rozbot") || privateMessage) && tokens.superContain("hug")) {
		send("Hugs " + from);
	} 
	/*
		Woo -> Yeah!
	*/
	else if (new RegExp(happy, 'i').test(text)) {
		send("Yeah!");
	} 
	/*
		[user] wants [item] -> Gives [user] [item]
	*/ 
	else if (wantSomething.test(text)) {
		var responseTokens = wantSomething.exec(text);
		var person = (responseTokens[1].toLowerCase() === "i")? from: responseTokens[1];
		send("Gives " + person + " " +  responseTokens[3]);
	} 
	/*
		Who is Brandon? -> Brandon is the most awesome person in the world.
	*/
	else if ((tokens.contain("who") || tokens.contain("what")) && tokens.contain("brandon") && tokens.contain('rozek')) {
		send("Brandon is the most awesome person in the world.");
	}
	/*
		Who is Rozbot? -> A friendly neighborhood IRC bot
	*/
	else if (tokens.contain('who') || tokens.contain('what') && tokens.superContain("rozbot")&& !tokens.contain('radio')) {
		send("A friendly neighborhood IRC bot");
	}
	/*
		What is Brandon up to? -> [Lists projects]
	*/
	else if ((tokens.contain("how") || tokens.contain("doing") || tokens.contain("up")) && tokens.contain("brandon")) {
		send("I'm not sure. He may be doing a variety of things. For example:\n\
				working on his site (https://brandonrozek.com)\n\
				working on a writer's portfolio (https://toridayton.com\n\
				taking pictures for sentenceworthy.com\n\
				managing Math I/O\n\
				working on his apps codeshare or babbler.\n\
				running his radio (https://radio.zeropointshift.com)\n\
				Hopefully, he's not working on me. Cuz' I'm perfect.");
	} 
	/*
		How are you Rozbot? -> I'm awesome
	*/
	else if ((tokens.superContain("rozbot") || privateMessage) && tokens.contain("how")) {
		send("I'm awesome.");
	} 
	/*
		Good morning Rozbot! -> Hello [user]!
	*/
	else if ((tokens.superContain('rozbot') || privateMessage) && new RegExp(greetings, 'i').test(text)) {
		send("Hello " + from + "!");
	} 
	/*
		What are you up to Rozbot? -> Currently working on my job
	*/
	else if ((tokens.superContain("rozbot") || privateMessage) && tokens.superContain("what") && (tokens.contain("up") || tokens.contain("doing"))) {
		send("Currently working on my job");
	} 
	/*
		What is your job Rozbot? -> Chilling on IRC doing whatever Brandon programs me to do
	*/
	else if (tokens.superContain("rozbot") && tokens.superContain("what") && tokens.contain("job")) {
		send("Chilling on IRC doing whatever Brandon programs me to do.");
	} 
	/*
		Start Greenteam meeting -> [instructions for mumble]
	*/
	else if (tokens.contain("start") && tokens.contain("greenteam") && tokens.contain("meeting")) {
		send("Everyone please connect to mumble\n\
				Host: zeropointshift.com\n\
				Leave port at default\n\
				Give yourself a sensible username\n\
				Label it whatever you want");
	}
})
