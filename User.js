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
				properties: [],
				setProperty: function(key, value) {
					//First make sure it doesn't already exist
					for (var i = 0; i < this.properties.length; i++) {
						//If it does then update it						
						if (this.properties[i].key === key) {
							this.properties[i].value = value;
							return;
						}
					}
					//If it doesnt exist then add it to the properties array
					this.properties.push({key: key, value: value});
				},
				getProperty: function(key) {
					for (var i = 0; i < this.properties.length; i++) {
						if (this.properties[i].key === key) {
							return this.properties[i].value;
						}
					}
					//Key does not exist
					return null;
				},
				isset: function(key) {
					return this.getProperty(key) !== null;
				},
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
