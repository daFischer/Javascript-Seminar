

// The code in the beginning, without using any kind of pattern
var name = $("#nameField").val();
var password = "password";
var login = new function () {
	alert(name + " trying to log in using '" + password + "' as password.");
}



// Problem: The password should not be readable by any other file for security reasons
// Solution: Anonymous closure
(function () {
	var name = $("#nameField").val();
	var password = "password";
	var login = new function () {
		alert(name + " trying to log in using '" + password + "' as password.");
	}
	// ...
}) ();



// Problem: Usage of global variables ($) in local scope might be confusing
// Solution: Explicit Import
(function ($) {
	var name = $("#nameField").val();
	var password = "password";
	var login = new function () {
		alert(name + " trying to log in using '" + password + "' as password.");
	}
	// ...
}) (jQuery);



// Problem: The name and the login function should be accessible from the outside
// Solution: Module Export
MODULE = (function ($) {
	var m = {};
	m.name = $("#nameField").val();
	var password = "password";
	m.login = new function () {
		alert(m.name + " trying to log in using '" + password + "' as password.");
	}
	// ...
	return m;
}) (jQuery);



// Problem: We want to extend our module (e.g. write a real login function)
// Solution: (Tight) Module Augmentation
MODULE = (function (m) {
	m.login = new function () {
		console.log(name + " trying to log in");
		someLoginMethod(m.name, password);
	}
	// ...
	return m;
}) (MODULE);



// Problem: password is not readable in the new module file (different environment)
// Solution: Shared private state
// If this snippet doesn't fit on one slide, maybe we'll have to move m.loadModule to the next slide
var MODULE = (function () {
	var m = {};
	var _private = m._private = {};
	_private.seal = function () {
			delete m._private;
		};
	_private.unseal = function () {
			m._private = _private;
		};
	m.loadModule = function (url) {
		_private.unseal()
		loadJSFile(url);
		_private.seal();
	}
	// ...
	_private.seal();
	return m
}());



// Problem: A module split into several files should be loaded in parallel for efficiency
// Solution: Loose Augmentation
MODULE = (function (m) {
	m.method1 = new function () {
		// ...
	}
	// ...
	return m;
}) (MODULE || {});

MODULE = (function (m) {
	m.method2 = new function () {
		// ...
	}
	// ...
	return m;
}) (MODULE || {});



// Submodules
// loose augmentation
MODULE = MODULE || {};

MODULE.sub = (function () {
	var s = {};
	// ...
	return s;
}());



// Since modules simulate classes, why not add inheritance?
// Solution: (PARENT Module has to exist, so this can't load in parallel)
var MODULE = (function (parent) {
	var m = {};

	for(var key in parent) {
		if(parent.hasOwnProperty(key)) {
			m[key] = parent[key];

	m.parent = parent;	// important to do this last
	return m;
}(PARENT));








