var Command = require('./Command.js');
var grabURL = require('../helpers/grabURL.js');

var condition = function(text) {
	//This is a catch all
	return true;
}
module.exports = new Command("DuckDuckGoQuery", condition, function(text, send, userData) {
	grabURL("https://duckduckgo.com/?q=" + text.split(' ').join('+') + "&format=json&no_redirect=1&t=rozbot")
		.then(function(response) { return response.body.toString(); })
		.then(function(text) { return JSON.parse(text); })
		.then(function(json) {
			if (json.Answer != "") {
				send(json.Answer + "\nResults from DuckDuckGo");
				return true;
			}
			if (json.AbstractText != "") {
				send(json.AbstractText + "\nMore at " + json.AbstractURL);
				return true;
			}
			if (json.Redirect != "") {
				send(json.Redirect);
			}
		}).catch(function(error) { console.log(error); });
})
