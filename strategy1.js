var MODULE = (function (m) {
	
	m.calculateCell = function (isAlive, neighbours) {
		var livingNeigbours = 0;
		for (var i = 0; i < neighbours.length; i++)
			if (neighbours[i])
				livingNeigbours++;
		if (isAlive) {
			return livingNeigbours == 2 || livingNeigbours == 3;
		} else {
			return livingNeigbours == 3;
		}
	}
	
	console.log("Strategy 1 loaded");
	return m;
}(MODULE));