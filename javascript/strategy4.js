var MODULE = (function (m) {

    m.calculateCell = function (isAlive, neighbours) {
        var livingNeigbours = 0;
        for (var i = 0; i < neighbours.length; i++)
            if (neighbours[i])
                livingNeigbours++;
        if (isAlive) {
            return livingNeigbours == 3 || livingNeigbours == 6 || livingNeigbours == 7 || livingNeigbours == 8;
        } else {
            return livingNeigbours == 3 || livingNeigbours == 4 || livingNeigbours == 6 || livingNeigbours == 7 || livingNeigbours == 8;
        }
    }

    console.log("Strategy 2 loaded");
    return m;
}(MODULE));