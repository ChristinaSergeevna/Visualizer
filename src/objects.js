var Obj = require('./Object.js')
var Grid = require('./Grid.js')
var Intersec = require('./Intersections.js')

module.exports = class Objects {
    constructor(data) {
        this.container = d3.select('.itemContainer');
        this.data = data;
        this.items = { ans: [], sol: [], input: [] };
        this.animated = [];
        this.dataAnim = [];
        this.linepath = [];
        this.pauseValues = [];
        this.styles = {
            input: { 'stroke-width': 1.5, fill: '#61ff96', 'fill-opacity': 0.8, 'stroke-opacity': 0.5, stroke: '#3d704e' },
            ans  : { 'stroke-width': 1.5, fill: '#87CEFA', 'fill-opacity': 0.8, 'stroke-opacity': 0.5, stroke: '#00578a' },
            sol  : { 'stroke-width': 1.5, fill: '#FFA07A', 'fill-opacity': 0.8, 'stroke-opacity': 0.5, stroke: '#8a7c00' },
            point: function(intersec) {
                return { 'stroke-width': 3, fill: intersec ? '#8B0000' : 'black', stroke: 'IndianRed' };
            }
        }
        this.createFigure = function(cl, data_ans, data_sol, style_ans, style_sol) {
            this.items.ans.push(new Obj(cl, 'ans', data_ans, this.container, style_ans ? style_ans : this.styles.ans));
            this.items.sol.push(new Obj(cl, 'sol', data_sol, this.container, style_sol ? style_sol : this.styles.sol));
        }
    }

    static parseData(data) {
        var buff = data.trim().split(/\s+/);
        for (var j = 0; j < buff.length; ++j) {
            buff[j] = parseFloat(buff[j]);
        }
        return buff;
    }

    static parseDataObj(obj) {
        return [obj.attr('x2'), obj.attr('y2')];
    }

    static checkboxs() {
        d3.select('.inset_content').append('input')
            .attr('type', 'checkbox')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '360px')
            .style('left', '30px')
            .attr('checked', 'true')
            .on('change', function() {
                var visible = this.checked ? 1 : 0;
                d3.selectAll('#ans').style('opacity', visible);
            });

        d3.select('.inset_content').append('text')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '360px')
            .style('left', '50px')
            .text('answer')
            .style('color', '#87CEFA');

        d3.select('.inset_content').append('input')
            .attr('type', 'checkbox')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '385px')
            .style('left', '30px')
            .attr('checked', 'true')
            .on('change', function() {
                var visible = this.checked ? 1 : 0;
                d3.selectAll('#sol').style('opacity', visible);
            });

        d3.select('.inset_content').append('text')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '385px')
            .style('left', '50px')
            .text('solution')
            .style('color', '#FFA07A');
    }

    create() {
        var data = this.data;
        for (var ans = [], sol = [], i = 0; i < data.length; ++i) {
            if (data[i].class == 'intersection' || data[i].class == 'angle') {
                for (var j = 0; j < data[i].figures.length; ++j) {
                    if ((this.items['ans'][data[i].figures[j][0]]).obj.attr('class') == 'line') {
                        var point_ans = Intersec.intersectionLines(this.container, this.items['ans'][data[i].figures[j][0]].obj, this.items['ans'][data[i].figures[j][1]].obj);
                        var point_sol = Intersec.intersectionLines(this.container, this.items['sol'][data[i].figures[j][0]].obj, this.items['sol'][data[i].figures[j][1]].obj);
                        this.createFigure('point', point_ans.data, point_sol.data, this.styles.point(point_ans.intersec), this.styles.point(point_sol.intersec));
                        if (data[i].class == 'angle') {
                            if (point_ans.intersec)
                                new Obj('angle', 'ans', [point_ans.data, Objects.parseDataObj(this.items['ans'][data[i].figures[j][0]].obj),
                                        Objects.parseDataObj(this.items['ans'][data[i].figures[j][1]].obj)], this.container, this.styles.ans);
                            if (point_sol.intersec)
                                new Obj('angle', 'sol', [point_sol.data, Objects.parseDataObj(this.items['sol'][data[i].figures[j][0]].obj),
                                        Objects.parseDataObj(this.items['sol'][data[i].figures[j][1]].obj)], this.container, this.styles.sol);
                        }
                    }
                    else if ((this.items['ans'][data[i].figures[j][0]]).obj.attr('class') == 'circle') {
                        var seg = { ans: Intersec.intersectionCircles(this.container, this.items['ans'][data[i].figures[j][0]].obj, this.items['ans'][data[i].figures[j][1]].obj),
                                    sol: Intersec.intersectionCircles(this.container, this.items['sol'][data[i].figures[j][0]].obj, this.items['sol'][data[i].figures[j][1]].obj)};
                        for (var it in seg ) {
                            alert(seg[it]);
                            if (seg[it].length > 2)
                                this.items[it].push(new Obj('segment', it, seg[it], this.container, this.styles[it]));
                            else if (seg[it].length == 2)
                                this.items[it].push(new Obj('point', it, seg[it], this.container, this.styles.point(true)));
                        }
                    }
                }
            }
            else {
                for (var it in data[i]) {
                    if (it != 'id' && it != 'class') {
                        var d = Objects.parseData(data[i][it]);
                        var cl = (d.length > 4 && data[i].class != 'path') ? 'animated' + data[i].class : data[i].class;
                        this.items[it].push(new Obj(cl, it, d, this.container, this.styles[it]));
                        if (d.length > 4 && data[i].class != 'path') {
                            this.animated.push(this.items[it][this.items[it].length - 1]);
                            this.dataAnim.push({ duration: 5000, r: Math.random() * 100 });
                            this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                            this.linepath.push(new Obj('path', it, d.slice(1, d.length), this.container, this.styles[it]));
                        }
                    }
                }
            }
        }
        Objects.checkboxs();
    }
}