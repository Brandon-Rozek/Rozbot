var EventEmitter = require('events');
var promise = require('promise-polyfill');
module.exports = function(username, sendMethod) {
	this.username = username;
	this.data = {};
	this.inAppScope = false;
	this.listener = new EventEmitter();
	this.send = sendMethod;
	this.getData = function(commandName) {
		var self = this;
		//If it doesn't exist, create it
		if (this.data[commandName] === undefined) {
			this.data[commandName] = {
				username: self.username,
				properties: [],
				prompt: function(question) {
					question = question || "is reading your next message";
					//Inform user that the next input goes to the app
					self.send(commandName + ": " + question);
					//Make it so that the input doesnt get processed by any other app
					self.inAppScope = true;
					return new promise(function(resolve, reject) {
						self.listener.once('message', function(text) {
							resolve(text);
							self.inAppScope = false;
						});
					});
				}
			} 
		}

		return this.data[commandName];
	}
}
