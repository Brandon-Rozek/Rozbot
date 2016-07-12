var Command = require('./Command.js');
var grabURL = require('../helpers/grabURL.js');
var grabTokens = require('../helpers/grabTokens.js');

var condition = function(text) {
	var tokens = grabTokens(text);
	return tokens.superContain('what') && tokens.contain('radio');
}
module.exports = new Command("OnTheRadio", condition, function(text, send, userData) {
		grabURL('https://meldicradio.com/json')
			.then(function(response) { return response.body.toString(); })
			.then(function(text) { return JSON.parse(text); })
			.then(function(json) { send("\"" + json.artist + " - " + json.title + "\" is currently playing on meldicradio.com"); })
			.catch(function(error) { send(error); });
});
