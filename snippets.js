// main.js
var MODULE = (function (m) {
	/* This function calls the overridable function m.calculateCell for each cell
	 * It then replaces the old cells array with the results of all these calls */
	m.updateCells = function () {
		for (var i = 0; i < cells.length; i++) {
			cells[i] = m.calculateCell(...);
		};
	}
	/* This function will be overwritten by the loaded modules */
	m.calculateCell = function (isAlive, neighbours) {
	}
	m.drawCanvas = m.drawCanvas || function () {
	}
	return m;
}(MODULE || {}));



// extension.js
var MODULE = (function (m) {
	m.drawCanvas = function () {
	}
	return m;
}(MODULE || {}));


// strategy.js
var MODULE = (function (m) {
	m.calculateCell = function (isAlive, neighbours) {
	}
	return m;
}(MODULE));



//----------------------------------------
// ECMASCRIPT 6

// lib.js
export function circumference(radius) {
    return radius * 2 * Math.PI;
}

// main.js
import {circumference} from 'lib';
console.log(circumference(3));




// Alternatives:

// main.js imports everything by using a wildcard
import * as lib from 'lib';
console.log(lib.circumference(3));




// lib.js has a single default export
export default class { ··· } // no semicolon!

// main.js
import MyClass from 'MyClass';
let inst = new MyClass();










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








