// Welche Variante ist am schnellsten und wieso? Wieso sind die anderen Varianten langsamer?

var adder = {
	add: function(x, y) { return x + y; }
};

// Variante 1
(function() {
	var outer = 1;
	return {
		add: function(x, y) { return adder.add(x, y); }
	};
})();

// Variante 2
(function(adder) {
	var outer = 1;
	return {
		add: function(x, y) { return adder.add(x, y); }
	};
})(adder);

// Variante 3
(function(adder) {
	var outer = 1;
	return
		{
		add: function(x, y) { return adder.add(x, y); }
	};
})(adder);