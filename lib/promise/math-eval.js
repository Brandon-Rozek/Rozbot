var algebrite = require('algebrite');
var promise = require('promise-polyfill');

module.exports = function(expression) {
	return new promise(function(resolve, reject) {
		resolve(algebrite.eval(expression).toString());
	});
}
