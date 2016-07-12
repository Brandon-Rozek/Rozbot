var Command = require('./Command.js');
var grabURL = require('../helpers/grabURL.js');
var parseWikipedia = require('../helpers/parseWikipedia.js');
var grabTokens = require('../helpers/grabTokens.js');

var condition = function(text) {
	var tokens = grabTokens(text);
	return tokens.superContain('what') && tokens.slice(tokens.superContainAt('what') + 1).join('+').length > 0;
}
module.exports = new Command("Wikipedia", condition, function(text, send, userData) {
	var tokens = grabTokens(text);
	var query = tokens.slice(tokens.superContainAt('what') + 1).join('+');
	var origin;				
	grabURL("https://en.wikipedia.org/w/index.php?search=" + query).then(function(res) {
		origin = res.meta.finalUrl;
		return parseWikipedia(res.body.toString());
	}).then(function(definition) {
		send(definition + "\nMore information at " + origin);
	}).catch(function(error) {
		send(error);
	});
})
