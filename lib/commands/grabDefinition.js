var Command = require('./Command.js');
var fetch = require('../promise/fetch.js');
var parseWordnik = require('../helpers/parseWordnik.js');
var grabTokens = require('../helpers/grabTokens.js');

var condition = function(text) {
	var tokens = grabTokens(text);
	var query;
	if (tokens.contain("define") && tokens[tokens.indexOf('define') + 1]) {
		query = tokens.splice(tokens.indexOf('define') + 1).join("%20");
	} else if (tokens.contain("definition") && tokens[tokens.indexOf('definition') + 1]) {
		query = tokens.splice(tokens.indexOf('definition') + 1).join("%20");
	}
	return (tokens.contain("define") || tokens.contain("definition")) && query != "";
}
module.exports = new Command("Dictionary", condition, function(text, send, userData) {
	var tokens = grabTokens(text);
	var query = "";				
	if (tokens.contain("define") && tokens[tokens.indexOf('define') + 1]) {
		query = tokens.splice(tokens.indexOf('define') + 1).join("%20");
	} else if (tokens.contain("definition") && tokens[tokens.indexOf('definition') + 1]) {
		query = tokens.splice(tokens.indexOf('definition') + 1).join("%20");
	}
	var origin;
	fetch("https://www.wordnik.com/words/" + query, {rejectUnauthorized: false}).then(function(res) {
		origin = res.meta.finalUrl;
		return parseWordnik(res.body.toString());
	}).then(function(def) {
		send(def + "\nFor more go to " + origin);
	}).catch(function(error) {
		send(error);
	});
})
