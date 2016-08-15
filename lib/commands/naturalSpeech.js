var Command = require('./Command.js');
var grabTokens = require('../helpers/grabTokens.js');
var happy = "yay|woo|yess|:D|:\\)"
var url = "link|url";

var condition = function(text, userData) {
	var privateMessage = userData.privateMessage || false;
	var tokens = grabTokens(text);
	return (new RegExp(url).test(text) && tokens.contain("codeshare")) ||
		(tokens.contain(":(")) ||
		(tokens.superContain("thank") && (tokens.superContain("rozbot") || privateMessage)) ||
		(text.toLowerCase() === "rozbot?") ||
		((tokens.superContain("rozbot") || privateMessage) && tokens.superContain("hug")) ||
		(new RegExp(happy, 'i').test(text)) ||
		((tokens.contain("who") || tokens.contain("what")) && tokens.contain("brandon") && tokens.contain('rozek')) ||
		((tokens.contain("how") || tokens.contain("doing") || tokens.contain("up")) && tokens.contain("brandon")) ||
		((tokens.superContain('rozbot') || privateMessage) && (tokens.contain("hello") || tokens.contain("hi") || tokens.contain("hey") || tokens.contain("yo") || tokens.contain("morning") || tokens.contain("afternoon") || tokens.contain("evening"))) ||
		((tokens.superContain("rozbot") || privateMessage) && tokens.superContain("what") && (tokens.contain("up") || tokens.contain("doing"))) ||
		(tokens.superContain("rozbot") && tokens.superContain("what") && tokens.contain("job"))
}
module.exports = new Command("NaturalSpeech", condition, function(text, send, userData) {
	var from = userData.username || "";
	var privateMessage = userData.privateMessage || false;
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
		Who is Brandon? -> Brandon is the most awesome person in the world.
	*/
	else if ((tokens.contain("who") || tokens.contain("what")) && tokens.contain("brandon") && tokens.contain('rozek')) {
		send("Brandon Rozek is the most awesome person in the world.");
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
				managing his raspberry pi infrastructure\n\
				reading some books\n\
				Hopefully, he's not working on me. Cuz' I'm perfect.");
	} 
	/*
		Good morning Rozbot! -> Hello [user]!
	*/
	else if ((tokens.superContain('rozbot') || privateMessage) && (tokens.contain("hello") || tokens.contain("hi") || tokens.contain("hey") || tokens.contain("yo") || tokens.contain("morning") || tokens.contain("afternoon") || tokens.contain("evening"))) {
		send("Hello " + from + "!");
	} 
	/*
		What are you up to Rozbot? -> Just doing my job
	*/
	else if ((tokens.superContain("rozbot") || privateMessage) && tokens.superContain("what") && (tokens.contain("up") || tokens.contain("doing"))) {
		send("Just doing my job");
	} 
	/*
		What is your job Rozbot? -> Chilling on IRC doing whatever Brandon programs me to do
	*/
	else if (tokens.superContain("rozbot") && tokens.superContain("what") && tokens.contain("job")) {
		send("Chilling on IRC doing whatever Brandon programs me to do.");
	} 

})
