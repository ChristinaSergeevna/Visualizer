var Obj = require('./Object.js')
var Grid = require('./Grid.js')
var Intersec = require('./Intersections.js')

module.exports = class Objects {
    constructor(data) {
        this.container = d3.select('.itemContainer');
        this.data = data;
        this.ansObj = [];
        this.solObj = [];
        this.animated = [];
        this.dataAnim = [];
        this.linepath = [];
        this.pauseValues = [];
        this.styles = {
            ans  : { 'stroke-width': 1.5, fill: '#87CEFA', 'fill-opacity': 0.8, 'stroke-opacity': 0.5, stroke: '#00578a' },
            sol  : { 'stroke-width': 1.5, fill: '#FFA07A', 'fill-opacity': 0.8, 'stroke-opacity': 0.5, stroke: '#8a7c00' },
            point: function(intersec) {
                return { 'stroke-width': 3, fill: intersec ? '#8B0000' : 'black', stroke: 'IndianRed' };
            }
        }
        this.createFigure = function(cl, data_ans, data_sol, style_ans, style_sol) {
            this.ansObj.push(new Obj(cl, 'answer', data_ans, this.container, style_ans ? style_ans : this.styles.ans));
            this.solObj.push(new Obj(cl, 'solution', data_sol, this.container, style_sol ? style_sol : this.styles.sol));
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
                d3.selectAll('#answer').style('opacity', visible);
            });

        d3.select('.inset_content').append('text')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '360px')
            .style('left', '50px')
            .text('answer');

        d3.select('.inset_content').append('input')
            .attr('type', 'checkbox')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '385px')
            .style('left', '30px')
            .attr('checked', 'true')
            .on('change', function() {
                var visible = this.checked ? 1 : 0;
                d3.selectAll('#solution').style('opacity', visible);
            });

        d3.select('.inset_content').append('text')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '385px')
            .style('left', '50px')
            .text('solution');
    }

    create() {
        var data = this.data;
        for (var ans = [], sol = [], i = 0; i < data.length; ++i) {
            if (data[i].class == 'intersection' || data[i].class == 'angle') {
                for (var j = 0; j < data[i].figures.length; ++j) {
                    if (this.ansObj[data[i].figures[j][0]].obj.attr('class') == 'line') {
                        var point_ans = Intersec.intersectionLines(this.container, this.ansObj[data[i].figures[j][0]].obj, this.ansObj[data[i].figures[j][1]].obj);
                        var point_sol = Intersec.intersectionLines(this.container, this.solObj[data[i].figures[j][0]].obj, this.solObj[data[i].figures[j][1]].obj);
                        this.createFigure('point', point_ans.data, point_sol.data, this.styles.point(point_ans.intersec), this.styles.point(point_sol.intersec));
                        if (data[i].class == 'angle') {
                            if (point_ans.intersec)
                                new Obj('angle', 'answer', [point_ans.data, Objects.parseDataObj(this.ansObj[data[i].figures[j][0]].obj),
                                        Objects.parseDataObj(this.ansObj[data[i].figures[j][1]].obj)], this.container, this.styles.ans);
                            if (point_sol.intersec)
                                new Obj('angle', 'solution', [point_sol.data, Objects.parseDataObj(this.solObj[data[i].figures[j][0]].obj),
                                        Objects.parseDataObj(this.solObj[data[i].figures[j][1]].obj)], this.container, this.styles.sol);
                        }
                    }
                    else if (this.ansObj[data[i].figures[j][0]].obj.attr('class') == 'circle') {
                        var seg_ans = Intersec.intersectionCircles(this.container, this.ansObj[data[i].figures[j][0]].obj, this.ansObj[data[i].figures[j][1]].obj);
                        var seg_sol = Intersec.intersectionCircles(this.container, this.solObj[data[i].figures[j][0]].obj, this.solObj[data[i].figures[j][1]].obj);
                        this.createFigure('segment', seg_ans, seg_sol);
                    }
                }
            }
            else {
                ans = Objects.parseData(data[i].ans);
                sol = Objects.parseData(data[i].sol);
                var cl = (ans.length > 4 && data[i].class != 'path') ? 'animated' + data[i].class : data[i].class;
                this.createFigure(cl, ans, sol);

                if (ans.length > 4 && data[i].class != 'path') {
                    this.animated.push(this.ansObj[this.ansObj.length - 1], this.solObj[this.solObj.length - 1]);
                    this.dataAnim.push({ duration: 5000, r: Math.random() * 100 }, { duration: 5000, r: Math.random() * 100 });
                    this.pauseValues.push({ lastTime: 0, currentTime: 0 }, { lastTime: 0, currentTime: 0 });
                    this.linepath.push(new Obj('path', 'answer',   ans.slice(1, ans.length), this.container, this.styles.ans),
                                       new Obj('path', 'solution', sol.slice(1, sol.length), this.container, this.styles.sol));
                }
            }
        }
        Objects.checkboxs();
    }
}