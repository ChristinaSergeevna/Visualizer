var Figure = require('./Figure.js')
var Grid = require('./Grid.js')
// import {Figure, Circle} from './figure.js';

module.exports = class Figures {
    constructor (view, grid, data, width, height) {

        var xScale = d3.scaleLinear()
            .domain([-width / 2, width / 2])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([-height / 2, height / 2])
            .range([height, 0]);

        var styles = {
            'circle': { lwidth: 2.5, clrf: '#87CEEB', clr: 'none' },
            'square': { lwidth: 2.5, clrf: '#3CB371', clr: 'none' },
            'line': { lwidth: 1.5, clrf: 'none', clr: 'black' },
            'point': { lwidth: 3, clrf: '#8B0000', clr: '#DC143C' }
        }
        this.pointsItems = [];
        this.itemContainer = view.selectAll("g")
                .attr("class", "itemContainer")
                .data(data[0].input).enter().append('g')
                .attr("transform", () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');

        this.animated = []; 
        this.dataAnim = []; 
        this.dataCircles = []; 
        this.linepath; 
        this.pauseValues = { lastTime: 0, currentTime: 0 }; 

        this.deleteItems = []; 
        this.items = [];

        this.selected = [];

        for (var i = 0; i < data.length; ++i) {
            var item = data[i].class;
            switch (item) {
                case 'selectSquare':
                    var obj = new Square(data[i], this.itemContainer);
                    items.push(obj.create());
                    break;
                case 'selectCircle':
                case 'circle':
                    var obj = new Figure(data[i], this.itemContainer);
                    this.items.push(obj.create());
                    alert(data[i].input);
                    break;
                case 'selectArc':
                    var obj = new Arc(data[i], this.itemContainer);
                    items.push(obj.create());
                    break;
                case 'draggableCircle':
                    var obj = new draggableCircle(data[i], this.itemContainer);
                    items.push(obj.create());
                    break;
                case 'resizingCircle':
                    var obj = new resizingCircle(data[i], this.itemContainer);
                    items.push(obj.create());
                    break;
                case 'line':
                    var obj = new Line(data[i], this.itemContainer);
                    items.push(obj.create());
                    break;
                case 'point':
                    var obj = new IntersectionPoint(data[i], this.itemContainer);
                    items.push(obj.create());
                    break;
                case 'path':
                    var obj = new Path(data[i], this.itemContainer);
                    items.push(obj.create());
                    break;
                default:
                    break;        
            }
            // var obj = new Figure(data[i], this.itemContainer, styles[data[i].class]);
            // items.push(obj);
        }
        this.buttons();
    }  

    ///////////////////////////////////////// animation /////////////////////////////////////////////////

    transition(circle, i) {
        circle.transition()
            .duration(this.dataAnim[i].duration - (this.dataAnim[i].duration * pauseValues.lastTime))
            .attr('r', this.dataAnim[i].r)
            .attrTween("transform", translateAlong(this.linepath.node()))
            .each("end", function() {
                this.pauseValues = { lastTime: 0, currentTime: 0 };
                transition(circle);
            });
    }
    
    translateAlong(path) {
        var l = path.getTotalLength();
        return function(d, i, a) {
            return function(t) {
                t += this.pauseValues.lastTime;
                var p = path.getPointAtLength(t * l);
                this.pauseValues.currentTime = t;
                return "translate(" + p.x + "," + p.y + ")";
            };
        };
    }
    
    buttons() {
        var start = d3.select("body").append("p")
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '20px')
            .style('left', '150px')
            .append("input")
                .datum({})
                .attr("type", "button")
                .attr('value', 'Start')
                .style('width', '80px')
                .on("click", function() {
                    for (var i = 0; i < animated.length; i++) {
                        animated[i].attr("transform", "translate(" + (dataPath[0]) + ")");
                        animated[i].attr('r', dataCircles[i].size)
                        pauseValues.lastTime = pauseValues.currentTime = 0;
                        transition(animated[i], i);
                    }
                });         
    
        var pause = d3.select("body").append("p")
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '50px')
            .style('left', '150px')
            .append("input")
                .datum({})
                .attr("type", "button")
                .attr('value', 'Pause')
                .style('width', '80px')
                .on("click", function(d, i) {
                    var button = d3.select(this);
                    if (button.attr('value') == 'Pause') {
                        button.attr("value", 'Resume');
                        for (var i = 0; i < animated.length; i++) {
                            animated[i].transition()
                                .duration(0);
                        }
                        setTimeout(function() {
                                pauseValues.lastTime = pauseValues.currentTime;
                            }, 100);
                    } 
                    else {
                        button.attr("value", 'Pause');
                        for (var i = 0; i < animated.length; i++) {
                            transition(animated[i], i);
                        }
                    }
                });

        var zoomInItem = d3.select("body").append("p")
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '150px')
            .style('left', '70px')
            .append("input")
                .datum({})
                .attr("type", "button")
                .attr('value', '+')
                .style('width', '30px')
                .on("click", function() {
                    zoomItem(10);
                });
    
        var zoomOutItem = d3.select("body").append("p")
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '180px')
            .style('left', '70px')
            .append("input")
                .datum({})
                .attr("type", "button")
                .attr('value', '-')
                .style('width', '30px')
                .on("click", function() {
                    zoomItem(-10);
                });
    
    ///////////////////////////////////// add delete ///////////////////////////////////////

        var addItem = d3.select("body").append("p")
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '90px')
            .style('left', '45px')
            .append("input")
                .datum({})
                .attr("type", "button")
                .attr('value', 'Add')
                .style('width', '80px')
                .on("click", function() {
                    items.push(getItem(itemContainer, deleteItems.pop()));
                });
    
        var deleteItem = d3.select("body").append("p")
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '120px')
            .style('left', '45px')
            .append("input")
                .datum({})
                .attr("type", "button")
                .attr('value', 'Delete')
                .style('width', '80px')
                .on("click", function() {
                    Figures.deleteItems.push({ data: pointsItems[items.length], obj: items.pop().remove()});
                });  
        buttonStyle(start);   
        buttonStyle(pause); 
        buttonStyle(addItem);
        buttonStyle(deleteItem);
        buttonStyle(zoomInItem);
        buttonStyle(zoomOutItem);  
    }
    
    ///////////////////////////////////// selection ///////////////////////////////////////
    
    selectItem(d) {
        for (var i = 0; i < this.selected.length; ++i) {
            if (this.selected[i] == this) {
                var el = d3.select(this);
                this.selected.splice(i, 1);
                el
                    .style('stroke-width', 'none')
                    .style('stroke', 'none');
                return;
            }
        }
        this.selected.push(this);
        var el = d3.select(this);
        el
            .style('stroke-width', 2)
            .style('stroke', 'black');
    }
    
    zoomItem(k) {
        for (var i = 0; i < this.selected.length; i++) {
            var el = d3.select(this.selected[i]);
            if (el.attr('class') == 'selectSquare') {
                var w = +el.attr('width'), h = +el.attr('height');
                var x = +el.attr('x'), y = +el.attr('y');
                el.attr('width', w + k).attr('height', h + k);
                // el.attr('x', x - k / 2); el.attr('y', y - k / 2);
            }
            else if (el.attr('class') == 'selectCircle') {
                var r = +el.attr('r');
                el.attr('r', r + k);
            }
        }
    } 
    
}   