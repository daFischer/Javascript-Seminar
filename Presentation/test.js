This is the code about the Shared Private State, which was hard to understand.
I changed the variable used for the module internally from 'm' to 'module', though.


// Problem: password is not readable in the new module file (different environment)
// Solution: Shared private state
// If this snippet doesn't fit on one slide, maybe we'll have to move module.loadModule to the next slide
var MODULE = (function (module) {

	var _private = module._private = module._private || {};

	_private.seal = _private.seal || function () {
			delete module._private;
		};

	_private.unseal = _private.unseal || function () {
			module._private = _private;
		};

	module.loadModule = module.loadModule || function (url) {
		_private.unseal()
		loadJSFile(url);
		_private.seal();
	}

	// ...

	_private.seal();
	return module
}(MODULE || {}));



I will walk you through it step by step, so it will hopefully be easier to grasp:

	var MODULE = (function (module) {
		// ...
	}(MODULE || {}));

We used loose augmentation, so there has to be a parameter in the closure call.
The input is either MODULE, if that variable already exists. Otherwise we are creating a new object, which will then become MODULE.


	var _private = module._private = module._private || {};

Let's split this line up a bit:

	module._private = module._private || {};
	var _private = module._private;

If this file is the first module file to be called, module._private will not exist yet. The property will be assigned a new empty object, then.
Otherwise, module._private is not overwritten. Instead we now have a reference to the _private object defined in another module file.
Like this, we can now read all private properties of MODULE, because they are assigned to module._private

In the next line, we define the local variable _private and assign it the same object as module._private.
This is important, because we will want to delete the reference to module._private after this module has been loaded, so that it can't be accessed from outside our local scopes.
After all, _private is still supposed to be private.

	_private.seal = _private.seal || function () {
			delete module._private;
		};

With this piece of code, we define a private function, that allows us to remove the publicly accessible reference to _private, namely MODULE._private.
If we didn't call this function at the end of the module, our _private object wouldn't be private at all.
This doesn't however delete the object _private itself. It can still be used via the locally scoped variable _private from inside the module file.

	_private.unseal = _private.unseal || function () {
			module._private = _private;
		};

This function reverses the effects of _private.seal, making module._private accessible from the outside again.
We'll have to call this each time before loading a module file.
It is important to notice that this function, as well as _private.seal are private variable while MODULE._private is sealed.
Thus it is impossible to just unseal the private variables of the module from the outside.

	module.loadModule = module.loadModule || function (url) {
		_private.unseal()
		loadJSFile(url);
		_private.seal();
	}

This is the function that has to be used in order to load new module files.
It first unseals the _private variable, so that the new module file can access the private state.
Then loadJSFile(url) is used to load the new module file.
Note that this function doesn't exist, it's merely a placeholder.
Lastly, we seal the private state again, such that no other code can access _private after the module file has loaded.

	// ...

Here the rest of the module definition is done.
Variables that should be private can be assigned like this:

	_private.newVar = "value";

For public variables, nothing changes.

	_private.seal();
	return module

Finally we seal _private from access from the outside and return the module object.