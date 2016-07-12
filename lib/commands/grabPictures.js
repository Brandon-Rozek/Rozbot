var Command = require('./Command.js');
var grabURL = require('../helpers/grabURL.js');
var parsePictures = require('../helpers/parsePictures.js');
var grabTokens = require('../helpers/grabTokens.js');

var condition = function(text) {
	var tokens = grabTokens(text);
	return tokens.contain('photo') || tokens.contain('photos') || tokens.superContain('pic') || tokens.superContain('pics');
}
module.exports = new Command("Pixabay", condition, function(text, send, userData) {
	var tokens = grabTokens(text);
	var of = "";
	var amt = 0;
	if (tokens.contain("photo")) {
		of = tokens.slice(tokens.indexOf('photo') + 1).join(' ');
		amt = 1;
	} else if (tokens.contain("photos")) {
		of = tokens.slice(tokens.indexOf('photos') + 1).join(' ');
		amt = 5;
	} else if (tokens.superContain("pic")) {
		//Is the last letter a 's'?
		if (tokens[tokens.superContainAt('pic')][tokens[tokens.superContainAt('pic')].length - 1] == 's') {
			amt = 5;
		} else {
			amt = 1;
		}
		of = tokens.slice(tokens.superContainAt('pic') + 1).join(' ');
	} 
	var origin;
	grabURL("https://pixabay.com/en/photos/?q=" + of).then(function(res) {
		origin = res.meta.finalUrl;
		return parsePictures(res.body.toString(), amt);
	}).then(function(pictures) {
		if (amt == 1) {
			send("Here is a picture: " + pictures);
		} else {
			send("Here are some pictures of " + of + ": \n" + pictures.join("\n") + " For more, check out " + origin);
		}
	}).catch(function(error) {
		send(error);
	});
})
