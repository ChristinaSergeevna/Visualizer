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

<<<<<<< HEAD
<<<<<<< HEAD
        this.pointsItems = [];
        this.itemContainer = view.selectAll('g')
                .attr('class', 'itemContainer')
                .data(data[0].res).enter().append('g')
                .attr('transform', () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        this.pointsItems = [];//data.input;//.concat(data.output);
        this.itemContainer = view.selectAll("g")
                .attr("class", "itemContainer")
                .data(data[0].res).enter().append('g')
                .attr("transform", () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

        this.animated = [];
        this.dataAnim = [];
        this.linepath = [];
<<<<<<< HEAD
<<<<<<< HEAD
        this.pauseValues = [];

        this.deleteItems = [];
=======
        this.pauseValues = []; 

        this.deleteItems = []; 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
        this.pauseValues = []; 

        this.deleteItems = []; 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        this.items = [];
        this.selected = [];

        var styles = {
            'res': { lwidth: 1.5, clrf: '#87CEFA', clr: '#00578a' },
            'sol': { lwidth: 1.5, clrf: '#FFA07A', clr: '#8a7c00' }
        }
        var styles2 = {
            'circle': { lwidth: 2.5, clrf: '#BC8F8F', clr: 'none' },
            'square': { lwidth: 2.5, clrf: '#3CB371', clr: 'none' },
            'line': { lwidth: 1.5, clrf: 'none', clr: 'black' },
            'point': { lwidth: 3, clrf: '#8B0000', clr: '#DC143C' }
        }

<<<<<<< HEAD
<<<<<<< HEAD

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
                        // alert('');
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
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        for (var res = [], sol = [], i = 0; i < data.length; ++i) {
            if (data[i].class == 'intersection') {
                for (var j = 0; j < data[i].figures.length; ++j) {
                    if (this.items[data[i].figures[j][0] * 2].attr('class') == 'line') {
                        var point = Intersec.intersectionLines(this.itemContainer, this.items[data[i].figures[j][0] * 2], this.items[data[i].figures[j][1] * 2]);
                        var obj = new Figure('point', point.data, this.itemContainer, { lwidth: 3, clrf: point.intersec ? '#8B0000' : 'black', clr: 'IndianRed' });
                        obj.create();

                        point = Intersec.intersectionLines(this.itemContainer, this.items[data[i].figures[j][0] * 2 + 1], this.items[data[i].figures[j][1] * 2 + 1]);
                        obj = new Figure('point', point.data, this.itemContainer, { lwidth: 3, clrf: point.intersec ? '#8B0000' : 'black', clr: 'IndianRed' });
                        obj.create();
                    }
                    else if (this.items[data[i].figures[j][0] * 2].attr('class') == 'selectCircle') {
                        var path = Intersec.intersectionCircles(this.itemContainer, this.items[data[i].figures[j][0] * 2], this.items[data[i].figures[j][1] * 2]);
                        var path = Intersec.intersectionCircles(this.itemContainer, this.items[data[i].figures[j][0] * 2 + 1], this.items[data[i].figures[j][1] * 2 + 1]);
                        // var obj = new Figure('path', path, this.itemContainer, { lwidth: 3, clrf: '#8B0000', clr: '#DC143C' });
                        // obj.create();
                    }
                }
            }

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
            var obj1 = new Figure(cl, res, this.itemContainer, styles['res']);
            var obj2 = new Figure(cl, sol, this.itemContainer, styles['sol']);
            this.items.push(obj1.create());
            this.items.push(obj2.create());

            if (res.length > 4 && data[i].class != 'path') {
                this.animated.push(this.items[this.items.length - 2]);
                this.animated.push(this.items[this.items.length - 1]);
                this.dataAnim.push({duration: 5000, r: Math.random() * 100});
                this.dataAnim.push({duration: 5000, r: Math.random() * 100});
                this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                var linepath = new Figure('path', res.slice(1, res.length), this.itemContainer, styles['res']);
                this.linepath.push(linepath.create());
                linepath = new Figure('path', sol.slice(1, res.length), this.itemContainer, styles['sol']);
                this.linepath.push(linepath.create());
            }
        }
    }  
    
    ///////////////////////////////////// selection ///////////////////////////////////////
    
    // selectItem(d) {
    //     for (var i = 0; i < this.selected.length; ++i) {
    //         if (this.selected[i] == this) {
    //             var el = d3.select(this);
    //             this.selected.splice(i, 1);
    //             el
    //                 .style('stroke-width', 'none')
    //                 .style('stroke', 'none');
    //             return;
    //         }
    //     }
    //     this.selected.push(this);
    //     var el = d3.select(this);
    //     el
    //         .style('stroke-width', 2)
    //         .style('stroke', 'black');
    // }
    
    // zoomItem(k) {
    //     for (var i = 0; i < this.selected.length; i++) {
    //         var el = d3.select(this.selected[i]);
    //         if (el.attr('class') == 'selectSquare') {
    //             var w = +el.attr('width'), h = +el.attr('height');
    //             var x = +el.attr('x'), y = +el.attr('y');
    //             el.attr('width', w + k).attr('height', h + k);
    //             // el.attr('x', x - k / 2); el.attr('y', y - k / 2);
    //         }
    //         else if (el.attr('class') == 'selectCircle') {
    //             var r = +el.attr('r');
    //             el.attr('r', r + k);
    //         }
    //     }
    // } 
    
    // buttons() {
    //     var zoomInItem = d3.select(".inset_content").append("button")
    //         .attr('class', 'button')
    //         .style('display', 'block')
    //         .style('position', 'absolute')
    //         .style('top', '140px')
    //         .style('left', '30px')
    //         .style('width', '30px')
    //         .on("click", function() {
    //             zoomItem(10);
    //         })
    //         .append('text')
    //             .text('+');
    
    //     var zoomOutItem = d3.select(".inset_content").append("button")
    //         .attr('class', 'button')
    //         .style('display', 'block')
    //         .style('position', 'absolute')
    //         .style('top', '170px')
    //         .style('left', '30px')
    //         .style('width', '30px')
    //         .on("click", function() {
    //             zoomItem(-10);
    //         })
    //         .append('text')
    //             .text('-');
    
    // ///////////////////////////////////// add delete ///////////////////////////////////////

    //     var addItem = d3.select(".inset_content").append("button")
    //         .attr('class', 'button')
    //         .style('display', 'block')
    //         .style('position', 'absolute')
    //         .style('top', '210px')
    //         .style('left', '30px')
    //         .style('width', '80px')
    //         .on("click", function() {
    //             items.push(getItem(itemContainer, deleteItems.pop()));
    //         })
    //         .append('text')
    //             .text('Add');
    
    //     var deleteItem = d3.select(".inset_content").append("button")
    //         .attr('class', 'button')
    //         .style('display', 'block')
    //         .style('position', 'absolute')
    //         .style('top', '240px')
    //         .style('left', '30px')
    //         .style('width', '80px')
    //         .on("click", function() {
    //             Figures.deleteItems.push({ data: pointsItems[items.length], obj: items.pop().remove()});
    //         })
    //         .append('text')
    //             .text('Delete');   
    // }
<<<<<<< HEAD
}   
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
}   
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
