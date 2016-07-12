var Command = require('./Command.js');
var grabURL = require('../helpers/grabURL.js');
var parseDuckDuckGo = require('../helpers/parseDuckDuckGo.js');
var grabTokens = require('../helpers/grabTokens.js');

var condition = function(text) {
	var tokens = grabTokens(text);
	return tokens.contain('search');
}

module.exports = new Command("Search", condition, function(text, send, userData) {
	var tokens = grabTokens(text);
		var search = text.substring(text.indexOf('search') + 6);
		grabURL("https://duckduckgo.com/html/?q=" + search.split(' ').join('+') + '&t=rozbot')
			.then(function(response) { return response.body.toString(); })
			.then(function(text) { return parseDuckDuckGo(text) })
			.then(function(results) { send("Results for \"" + search + "\":\n" + results.join("\n") + "\nSearch Provided by DuckDuckGo"); })
			.catch(function(error) { send(error) });
});
