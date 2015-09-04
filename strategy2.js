var MODULE = (function (m) {
	
	/* This function will be overwritten by the next loaded modules */
	m.loop = function () {
		document.getElementById("output").value = "Math.random() = " + Math.random();
	}
	
	console.log("Strategy 1 loaded");
	return m;
}(MODULE));