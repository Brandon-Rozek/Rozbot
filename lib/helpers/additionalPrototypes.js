String.prototype.contains = function(str) {
	return this.indexOf(str) != -1;
}
Array.prototype.contain = function(item) {
	return this.indexOf(item) != -1;
}
Array.prototype.superContain = function(item) {
	for (var i = 0; i < this.length; i++) {
		if (this[i].indexOf(item) != -1) {
			return true;
		}
	}
	return false;
}
Array.prototype.superContainAt = function(item) {
	for (var i = 0; i < this.length; i++) {
		if (this[i].indexOf(item) != -1) {
			return i;
		}
	}
	return false;
}
String.prototype.from = function(str) {
	return this.substring(this.indexOf(str) + str.length);
}
String.prototype.remove = function(str) {
	var index = this.indexOf(str);
	return this.substring(0, index) + this.substring(index + str.length);
}
String.prototype.removeAll = function(str) {
	var newString = this.substring(0);
	for (var i = 0; i < arguments.length; i++) {
		while (newString.contains(arguments[i])) {
			newString = newString.remove(arguments[i]);
		}
	}
	return newString;
}

