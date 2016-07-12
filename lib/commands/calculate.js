var Command = require('./Command.js');
var mathEval = require('../promise/math-eval.js');
var grabTokens = require('../helpers/grabTokens.js');

var condition = function(text) {
	var tokens = grabTokens(text);
	return tokens.contain('calculate') || tokens.contain('calc');
}
module.exports = new Command("Mathjax", condition, function(text, send, userData) {
	var tokens = grabTokens(text);
	var query;
	if (tokens.contain('calculate')) {
		query = text.from('calculate');
	} else if (tokens.contain('calc')) {
		query = text.from('calc');
	}
	query = query.removeAll('?');
	mathEval(query.toString()).then(function(answer) {
		send(answer);
	}).catch(function(error) {
		send("I'm not smart enough to calcuate that yet >.<");
	});
});
