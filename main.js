var MODULE = (function (m) {
	
	var milliseconds = 250;
	
	/* This function will be overwritten by the loaded modules */
	m.loop = function () {
		document.getElementById("output").value = "no modules loaded yet";
	}
	
	m.repeater = function() {
		m.loop();
		window.setTimeout(m.repeater, milliseconds);
	}
	
	/* This function can be used to add scripts after the html document has been loaded
	 * It's used to load the strategy modules */
	m.loadModule = function (url) {
		var head = document.getElementsByTagName("head");
		var script = document.createElement("script");
		script.src = url;
		
		head[0].appendChild(script);
	}
	
	/* The following 3 functions are called for strategy loading when the respective button is pressed */
	document.getElementById("button1").onclick = function () {
		m.loadModule("strategy1.js");
	}
	document.getElementById("button2").onclick = function () {
		m.loadModule("strategy2.js");
	}
	
	console.log("MODULE loaded");
	return m;
}(MODULE || {}));

MODULE.repeater();