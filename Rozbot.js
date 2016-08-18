var promise = require('promise-polyfill');
var prototypes = require('./lib/helpers/additionalPrototypes.js');
var User = require('./User.js');

module.exports = function() {
	//Store possible commands
	this.commandList = [];
	//Store users
	this.userList = [];

	//Add commands to the commandList
	this.extend = function(command) {
		if (typeof(command) === 'object') {
			this.commandList.push(command);
		} else  {
			throw new Error("Extend must take a Command Object");
		}
	};

	//Add user to userlist
	this.addUser = function(username, sendMethod) {
		var user = new User(username, sendMethod);
		this.userList.push(user);
		return user;
	}
	//Get's user from userlist by username
	this.getUser = function(username) {
		for (var i = 0; i < this.userList.length; i++) {
			if (this.userList[i].username === username) {
				return this.userList[i];
			}
		}
		//User not found
		return null;
	}

	//Gives Rozbot's response
	this.respond = function(message, user, extra) {

		//Store if it was a private message or not
		extra = extra || {};
		extra.privateMessage = extra.privateMessage || false;

		//Store whether or not an app wants to listen to the next message
		var inAppScope = user.inAppScope
		//Used to allow apps to get the next message
		user.listener.emit('message', message);

		if (!inAppScope) {
			var args = [message, user.send];
			//Find the right command to run
			var command = this.commandList.find(function(cmd) {
					var userData = user.getData(cmd.name);
					//Attach whether or not this is a private message
					userData.privateMessage = extra.privateMessage;
					return cmd.condition(message, userData ) === true;
			});
			//Run the command using user's contextual data (app by app basis)
			if (command !== undefined) {
				var userData = user.getData(command.name);
				command.respond.apply(command, args.concat(userData));
			}	
		}
	}
}
