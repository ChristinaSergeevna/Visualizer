var Figure = require('./Figure.js')
var Grid = require('./Grid.js')
var Intersec = require('./Intersections.js')

module.exports = class Figures {
    constructor(view, grid, data, width, height) {
        var xScale = d3.scaleLinear()
            .domain([-width / 2, width / 2])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([-height / 2, height / 2])
            .range([height, 0]);

        this.pointsItems = [];
        this.itemContainer = view.selectAll('g')
                .attr('class', 'itemContainer')
                .data(data[0].res).enter().append('g')
                .attr('transform', () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');

        this.animated = [];
        this.dataAnim = [];
        this.linepath = [];
        this.pauseValues = [];
        this.deleteItems = [];
        this.items = [];
        this.selected = [];

        var styles = {
            'res': { lwidth: 1.5, clrf: '#87CEFA', clr: '#00578a' },
            'sol': { lwidth: 1.5, clrf: '#FFA07A', clr: '#8a7c00' }
        }

        for (var res = [], sol = [], i = 0; i < data.length; ++i) {
            if (data[i].class == 'intersection') {
                for (var j = 0; j < data[i].figures.length; ++j) {
                    if (this.items[data[i].figures[j][0] * 2].obj.attr('class') == 'line') {
                        var point = Intersec.intersectionLines(this.itemContainer, this.items[data[i].figures[j][0] * 2].obj, this.items[data[i].figures[j][1] * 2].obj);
                        new Figure('point', point.data, this.itemContainer, { lwidth: 3, clrf: point.intersec ? '#8B0000' : 'black', clr: 'IndianRed' });
                        point = Intersec.intersectionLines(this.itemContainer, this.items[data[i].figures[j][0] * 2 + 1].obj, this.items[data[i].figures[j][1] * 2 + 1].obj);
                        new Figure('point', point.data, this.itemContainer, { lwidth: 3, clrf: point.intersec ? '#8B0000' : 'black', clr: 'IndianRed' });
                    }
                    else if (this.items[data[i].figures[j][0] * 2].obj.attr('class') == 'selectCircle') {
                        var path = Intersec.intersectionCircles(this.itemContainer, this.items[data[i].figures[j][0] * 2].obj, this.items[data[i].figures[j][1] * 2].obj);
                        var path = Intersec.intersectionCircles(this.itemContainer, this.items[data[i].figures[j][0] * 2 + 1].obj, this.items[data[i].figures[j][1] * 2 + 1].obj);
                        // var obj = new Figure('path', path, this.itemContainer, { lwidth: 3, clrf: '#8B0000', clr: '#DC143C' });
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
                this.items.push(new Figure(cl, res, this.itemContainer, styles['res']));
                this.items.push(new Figure(cl, sol, this.itemContainer, styles['sol']));

                if (res.length > 4 && data[i].class != 'path') {
                    this.animated.push(this.items[this.items.length - 2]);
                    this.animated.push(this.items[this.items.length - 1]);
                    this.dataAnim.push({duration: 5000, r: Math.random() * 100});
                    this.dataAnim.push({duration: 5000, r: Math.random() * 100});
                    this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                    this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                    this.linepath.push(new Figure('path', res.slice(1, res.length), this.itemContainer, styles['res']));
                    this.linepath.push(new Figure('path', sol.slice(1, sol.length), this.itemContainer, styles['sol']));
                }
            }
        }
    }
}