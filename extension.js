var MODULE = (function (m) {

	var canvas = document.getElementById("defaultCanvas");

	m.clearPast = function () {
		if (!m.past) {
			m.past = [];
			for(i = 0; i < m.width; i++) {
				m.past[i] = [];
				for(j = 0; j < m.height; j++) {
					m.past[i][j] = 0;
				}
			}
		} else {
			for(i = 0; i < m.width; i++)
				for(j = 0; j < m.height; j++) {
					m.past[i][j] = 0;
				}
		}
	}

	m.updatePast = function () {
		if(!m.past)
			m.clearPast();

		for(i = 0; i < m.width; i++)
			for(j = 0; j < m.width; j++)
			{
				if(m.past[i][j] > 0)
					m.past[i][j] = Math.max(0.4, m.past[i][j] - 0.05);
				if(m.cells[i][j])
					m.past[i][j] = 1;
			}
	}

	var mixColors = function (r1, g1, b1, r2, g2, b2, ratio) {
		var r = Math.round(r1 * (1 - ratio) + r2 * ratio);
		var g = Math.round(g1 * (1 - ratio) + g2 * ratio);
		var b = Math.round(b1 * (1 - ratio) + b2 * ratio);
		var h = '#' + r.toString(16) + g.toString(16) + b.toString(16);
		return h;
	}

	/*
	 * Draws the current state of the game of life on the canvas
	 */
	m.drawCanvas = function () {
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);

		m.updatePast();
		
		for(i = 0; i < m.width; i++)
			for(j = 0; j < m.width; j++) {
				if (m.cells[i][j]) {
					context.fillStyle = '#08a';
					context.beginPath();
					context.rect(canvas.width / m.width * i, canvas.height / m.height * j, canvas.width / m.width, canvas.height / m.height);
					context.fill();
				}
				else {
					context.fillStyle = mixColors(255, 255, 255, 255, 153, 102, m.past[i][j]);
					context.beginPath();
					context.rect(canvas.width / m.width * i, canvas.height / m.height * j, canvas.width / m.width, canvas.height / m.height);
					context.fill();
				}
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

	console.log("Extension loaded");
	return m;
}(MODULE || {}));

document.getElementById("clear").onclick = function () {
	MODULE.clearPast();
	MODULE.clearCells();
}
