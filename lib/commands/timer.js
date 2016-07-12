var Command = require('./Command.js');
var grabTokens = require('../helpers/grabTokens.js');

var condition = function(text) {
	var tokens = grabTokens(text);
	return tokens.superContain('timer') && (tokens.superContain('hour') || tokens.superContain('min') || tokens.superContain('sec'))
}

module.exports = new Command('Timer', condition, function(text, send, userData) {
	var tokens = grabTokens(text);
	var seconds = 0;		
	if (tokens.superContain('hour')) {
		var numHours = Number(tokens[tokens.superContainAt('hour') - 1]);
		if (numHours || numHours == 0) {
			seconds += numHours * 3600;
		} else {
			seconds += 3600;
		}
	}
	if (tokens.superContain('min')) {
		var numMins = Number(tokens[tokens.superContainAt('min') - 1]);
		if (numMins|| numMins == 0) {
			seconds += numMins * 60;
		} else {
			seconds += 60;
		}
	}
	if (tokens.superContain('sec')) {
		var numSeconds = Number(tokens[tokens.superContainAt('sec') - 1]);
		if (numSeconds || numSeconds == 0) {
			seconds += numSeconds;
		} else {
			seconds += 1;
		}
	}
	send("Timer set for " + seconds + " seconds");
	setTimeout(function() {
		send("Times up!");
	}, seconds * 1000);
});
