module.exports = function(commandName, condition, commandFunction) {
		//Name for identification purproses			
		this.name = commandName;
		//Must be a function which returns a boolean if it believes that the it's the appropriate command for the message
		this.condition = condition;
		//The command's core functionality
		this.respond = commandFunction;
}
