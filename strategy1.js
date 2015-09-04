var MODULE = (function (m) {
	
	if (!m.number)
	m.number = 0;
	
	/* This function will be overwritten by the next loaded modules */
	m.loop = function () {
		m.number++;
		document.getElementById("output").value = "strategy 1 has been called " + m.number + " times";
	}
	
	console.log("Strategy 1 loaded");
	return m;
}(MODULE));