var Figure = require('./Figure.js')
var Grid = require('./Grid.js')
var Intersec = require('./Intersections.js')

module.exports = class Figures {
    constructor(data) {
        function parseData(data) {
            return { x: data[0], y: data[1] };
        }

        function parseDataObj(obj) {
            return { x: obj.attr('x2'), y: obj.attr('y2') };
        }

        var width = d3.select('.view').attr('width'),
            height = d3.select('.view').attr('height');

        this.itemContainer = d3.select('.itemContainer');
        this.animated = [];
        this.dataAnim = [];
        this.linepath = [];
        this.pauseValues = [];
        this.items = [];

        var styles = {
            res  : { 'stroke-width': 1.5, fill: '#87CEFA', opacity: 0.8, 'stroke-opacity': 0.7, stroke: '#00578a' },
            sol  : { 'stroke-width': 1.5, fill: '#FFA07A', opacity: 0.8, 'stroke-opacity': 0.7, stroke: '#8a7c00' },
            point: function(intersec) {
                return { 'stroke-width': 3, fill: intersec ? '#8B0000' : 'black', stroke: 'IndianRed' };
            }
        }

        for (var res = [], sol = [], i = 0; i < data.length; ++i) {
            if (data[i].class == 'intersection' || data[i].class == 'angle') {
                for (var j = 0; j < data[i].figures.length; ++j) {
                    if (this.items[data[i].figures[j][0] * 2].obj.attr('class') == 'line') {
                        var point_res = Intersec.intersectionLines(this.itemContainer, this.items[data[i].figures[j][0] * 2].obj, this.items[data[i].figures[j][1] * 2].obj);
                        var point_sol = Intersec.intersectionLines(this.itemContainer, this.items[data[i].figures[j][0] * 2 + 1].obj, this.items[data[i].figures[j][1] * 2 + 1].obj);
                        new Figure('point', point_res.data, this.itemContainer, styles.point(point_res.intersec));
                        new Figure('point', point_sol.data, this.itemContainer, styles.point(point_sol.intersec));
                        if (data[i].class == 'angle') {
                            if (point_res.intersec)
                                new Figure('angle', [parseData(point_res.data), parseDataObj(this.items[data[i].figures[j][0] * 2].obj),
                                        parseDataObj(this.items[data[i].figures[j][1] * 2].obj)], this.itemContainer, styles.res);
                            if (point_sol.intersec)
                                new Figure('angle', [parseData(point_sol.data), parseDataObj(this.items[data[i].figures[j][0] * 2 + 1].obj),
                                        parseDataObj(this.items[data[i].figures[j][1] * 2 + 1].obj)], this.itemContainer, styles.sol);
                        }
                    }
                    else if (this.items[data[i].figures[j][0] * 2].obj.attr('class') == 'circle') {
                        var path = Intersec.intersectionCircles(this.itemContainer, this.items[data[i].figures[j][0] * 2].obj, this.items[data[i].figures[j][1] * 2].obj);
                        var path = Intersec.intersectionCircles(this.itemContainer, this.items[data[i].figures[j][0] * 2 + 1].obj, this.items[data[i].figures[j][1] * 2 + 1].obj);
                    }
                }
            }
            else {
                var buff = data[i].res.trim().split(/\s+/);
                for (var j = 0; j < buff.length; ++j) {
                    buff[j] = parseFloat(buff[j]);
                }
                res = buff;
                buff = data[i].sol.trim().split(/\s+/);
                for (var j = 0; j < buff.length; ++j)
                    buff[j] = parseFloat(buff[j]);
                sol = buff;

                var cl = (res.length > 4 && data[i].class != 'path') ? 'animated' + data[i].class : data[i].class;
                this.items.push(new Figure(cl, res, this.itemContainer, styles.res));
                this.items.push(new Figure(cl, sol, this.itemContainer, styles.sol));

                if (res.length > 4 && data[i].class != 'path') {
                    this.animated.push(this.items[this.items.length - 2]);
                    this.animated.push(this.items[this.items.length - 1]);
                    this.dataAnim.push({duration: 5000, r: Math.random() * 100});
                    this.dataAnim.push({duration: 5000, r: Math.random() * 100});
                    this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                    this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                    this.linepath.push(new Figure('path', res.slice(1, res.length), this.itemContainer, styles.res));
                    this.linepath.push(new Figure('path', sol.slice(1, sol.length), this.itemContainer, styles.sol));
                }
            }
        }
    }
}