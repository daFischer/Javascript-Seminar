var MODULE = (function (m) {
	
	m.milliseconds = 100;
	m.width = 60;
	m.height = 40;
	var canvas = document.getElementById("defaultCanvas");
	m.playing = false;
	
	/* This function calls the overridable function m.calculateCell for each cell
	 * It then replaces the old cells array with the results of all these calls
	*/
	m.updateCells = function () {
		var newCells = [];
		for(i = 0; i < m.width; i++) {
			newCells[i] = [];
			for(j = 0; j < m.height; j++) {
				newCells[i][j] = m.calculateCell(m.cells[i][j], [m.cells[(m.width + i - 1) % m.width][(m.height + j - 1) % m.height], m.cells[(m.width + i - 1) % m.width][j], m.cells[(m.width + i - 1) % m.width][(j + 1) % m.height],
												m.cells[i][(m.height + j - 1) % m.height], m.cells[i][(j + 1) % m.height], 
												m.cells[(i + 1) % m.width][(m.height + j - 1) % m.height], m.cells[(i + 1) % m.width][j], m.cells[(i + 1) % m.width][(j + 1) % m.height]]);
			}
		}
		m.cells = newCells;
	}
	
	/* This function will be overwritten by the loaded modules
	*/
	m.calculateCell = function (isAlive, neighbours) {
		return isAlive;
	}
	
	/* This function is the basic loop.
	 * It is called every 250 milliseconds*/
	m.loop = function() {
		if (m.playing)
			m.updateCells();
		m.drawCanvas();
		window.setTimeout(m.loop, m.milliseconds);
	}
	
	/* This function can be used to add scripts after the html document has been loaded
	 * It's used to load the strategy modules */
	m.loadModule = function (url) {
		var head = document.getElementsByTagName("head");
		var script = document.createElement("script");
		script.src = url;
		
		head[0].appendChild(script);
	}
	
	/*
	 * Clears the 2d array m.cells, creating it if it doesn't exist
	 * m.cells is m.width wide and m.height high
	 */
	m.clearCells = function () {
		if (!m.cells) {
			m.cells = [];
			for(i = 0; i < m.width; i++) {
				m.cells[i] = [];
				for(j = 0; j < m.height; j++) {
					m.cells[i][j] = false;
				}
			}
		} else {
			for(i = 0; i < m.width; i++)
				for(j = 0; j < m.height; j++) {
					m.cells[i][j] = false;
				}
		}
	}
	
	/*
	 * Draws the current state of the game of life on the canvas
	 */
	m.drawCanvas = m.drawCanvas || function () {
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		context.fillStyle = '#08a';
		for(i = 0; i < m.width; i++)
			for(j = 0; j < m.width; j++)
				if (m.cells[i][j]) {
					context.beginPath();
					context.rect(canvas.width / m.width * i, canvas.height / m.height * j, canvas.width / m.width, canvas.height / m.height);
					context.fill();
				}
		
		context.strokeStyle = '#888';
		context.lineWidth = 1;
		for(i = 0; i <= m.width; i++) {
			context.beginPath();
			context.moveTo(canvas.width / m.width * i, 0);
			context.lineTo(canvas.width / m.width * i, canvas.height);
			context.stroke();
		}
		for(j = 0; j <= m.height; j++) {
			context.beginPath();
			context.moveTo(0, canvas.height / m.height * j);
			context.lineTo(canvas.width, canvas.height / m.height * j);
			context.stroke();
		}
	}
	
	/*
	 * Resizes the canvas to fit the page sizeToContent
	 * Redraws the canvas immediately to avoid flickering
	 */
	m.resizeCanvas = function (e) {
		canvas.width = canvas.scrollWidth;
		canvas.height = canvas.width * m.height / m.width;
		m.drawCanvas();
	}
	window.addEventListener("resize", m.resizeCanvas);
	
	/*
	 * The following lines set up the ability to change cells by clicking and holding the left mouse button
	 */
	var isDown = false;
	var makeAlive;
	var mousemove;
	canvas.addEventListener("mousemove", mousemove = function (e) {
		if (!isDown)
			return;
		var canvasRect = canvas.getBoundingClientRect();
		m.cells[Math.min(m.width - 1, Math.max(0, Math.floor((e.clientX - canvasRect.left) / canvas.width * m.width)))][Math.min(m.height - 1, Math.max(0, Math.floor((e.clientY - canvasRect.top) / canvas.height * m.height)))] = makeAlive;
	});
	canvas.addEventListener("mousedown", function (e) {
		isDown = true;
		var canvasRect = canvas.getBoundingClientRect();
		makeAlive = !m.cells[Math.min(m.width - 1, Math.max(0, Math.floor((e.clientX - canvasRect.left) / canvas.width * m.width)))][Math.min(m.height - 1, Math.max(0, Math.floor((e.clientY - canvasRect.top) / canvas.height * m.height)))];
		mousemove(e);
	})
	canvas.addEventListener("mouseup", function (e) {isDown = false;})
	canvas.addEventListener("mouseout", function (e) {isDown = false;})
	
	m.start = function() {
		m.playing = false;
		// create and fill the array that determines whether cells are alive
		m.clearCells();
		// resize the canvas to fit the page and draws it
		m.resizeCanvas();
		// start the actual loop
		m.loop();
	}
	
	m.pause = function () {
		m.playing = !m.playing;
		document.getElementById("play").style.display = m.playing ? "none" : "inline";
		document.getElementById("pause").style.display = m.playing ? "inline" : "none";
	}
	
	console.log("MODULE loaded");
	return m;
}(MODULE || {}));

/* The following 2 functions are called for strategy loading when the respective button is pressed */
document.getElementById("pause").onclick = document.getElementById("play").onclick = function () {
	MODULE.pause();
}
document.getElementById("button1").onclick = function () {
	MODULE.loadModule("strategy1.js");
}
document.getElementById("button2").onclick = function () {
	MODULE.loadModule("strategy2.js");
}
document.getElementById("clear").onclick = document.getElementById("clear").onclick || function () {
	MODULE.clearCells();
}

// Start the MODULE loop
MODULE.start();
