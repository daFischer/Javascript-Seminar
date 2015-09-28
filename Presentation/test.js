var loadJSFile = function(MODULE){
	MODULE = (function (m) {
		var _private = m._private = m._private || {};
		_private.seal = _private.seal || function () {
				delete m._private;
			};
		_private.unseal = _private.unseal || function () {
				m._private = _private;
			};
		m.loadModule = m.loadModule || function (url) {
			_private.unseal()
			loadJSFile(url);
			_private.seal();
		}
		_private.b = "b";
		// ...
		_private.seal();
		console.log(_private);
		return m
	}(MODULE || {}));
}

// Problem: password is not readable in the new module file (different environment)
// Solution: Shared private state
// If this snippet doesn't fit on one slide, maybe we'll have to move m.loadModule to the next slide
var MODULE = (function (m) {
	var _private = m._private = m._private || {};
	_private.seal = _private.seal || function () {
			delete m._private;
		};
	_private.unseal = _private.unseal || function () {
			m._private = _private;
		};
	m.loadModule = m.loadModule || function (url) {
		_private.unseal()
		loadJSFile(url);
		_private.seal();
	}
	_private.a = "a";
	// ...
	_private.seal();
	return m
}(MODULE || {}));

console.log(MODULE._private);

MODULE.loadModule(MODULE);

console.log(MODULE._private);

console.log(MODULE);
