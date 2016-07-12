var Command = require('./Command.js');
var grabURL = require('../helpers/grabURL.js');
var grabTokens = require('../helpers/grabTokens.js');

var condition = function(text) {
	var tokens = grabTokens(text);
	return command.id != '' && tokens.contain('weather');
}
var command = new Command("Weather", condition, function(text, send, userData) {
		var tokens = grabTokens(text);
		var location = tokens.slice(tokens.indexOf('weather') + 1, tokens.length);
		//Function to get the weather
		var getWeather = function(loc) {
			grabURL("http://api.openweathermap.org/data/2.5/weather?q=" + loc.join('+') + "&units=imperial&appid=" + command.id)
				.then(function(response) { return response.body.toString(); })
				.then(function(text) { return JSON.parse(text); })
				.then(function(json) {
					if (json.cod == 401) {
						send("Invalid API key set");
					} else {
						send(json.weather[0].description + " and the temperature is " + json.main.temp + " degrees Fahrenheit in " + json.name + "\nWeather provided by OpenWeatherMap");
					}
				}).catch(function(error) { send(error); });
		}
		//Did the person not specify the location and have no location set?
		if (location.length === 0 && !userData.isset("location")) {
			userData.prompt("Where do you live?").then(function(loc) {
				userData.setProperty("location", loc.split(" "));
				getWeather(loc.split(" "));
			});
		} 
		//The person specified the location		
		else if (location.length !== 0) {
			getWeather(location);
		} 
		//The person didn't specify but he has a location saved
		else {
			getWeather(userData.getProperty("location"));
		}
});

command.id = '';
//Need to call this with a proper id for this command to work
command.setId = function(id) {
	this.id = id;
}

module.exports = command;
