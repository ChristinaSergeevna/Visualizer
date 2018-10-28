module.exports = class Figure {
	constructor(cl, data, container, style) {
        this.data = data;
        this.obj = null;
        this.style = style;
        this.class = cl;
        this.container = container;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        this.datapath = data.slice(1, data.length);

=======
    } 

    create() {
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
    } 

    create() {
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
    } 

    create() {
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        var item = this.class;
        switch (item) {
            case 'selectSquare':
            case 'square':
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                this.obj = Square(this.data, this.container, this.style);
                break;
            case 'selectCircle':
            case 'circle':
                this.obj = Circle(this.data, this.container, this.style);
                break;
            case 'animatedcircle':
               this.obj = AnimatedCircle(this.data, this.container, this.style);
               break;
            case 'selectArc':
                this.obj = Arc(this.data, this.container, this.style);
                break;
            case 'draggableCircle':
                this.obj = draggableCircle(this.data, this.container);
                break;
            case 'resizingCircle':
                this.obj = resizingCircle(this.data, this.container);
                break;
            case 'line':
                this.obj = Line(this.data, this.container, this.style);
                break;
            case 'point':
                this.obj = IntersectionPoint(this.data, this.container, this.style);
                break;
            case 'path':
                this.obj = Path(this.data, this.container, this.style);
                break;
            default:
                break;
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                return Square(this.data, this.container, this.style);
            case 'selectCircle':
            case 'circle':
                return Circle(this.data, this.container, this.style);
            case 'animatedcircle':
               return AnimatedCircle(this.data, this.container, this.style);
            case 'selectArc':
                return Arc(this.data, this.container, this.style);
            case 'draggableCircle':
                return draggableCircle(this.data, this.container);
            case 'resizingCircle':
                return resizingCircle(this.data, this.container);
            case 'line':
                return Line(this.data, this.container, this.style);
            case 'point':
                return IntersectionPoint(this.data, this.container, this.style);
            case 'path':
                return Path(this.data, this.container, this.style);
            default:
                break;        
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        }
    }
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
function Circle(data, container, style) {
    return container.append('circle')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
function Circle(data, container, style) {   
    return container.append('circle')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth) 
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        .style('fill-opacity', 0.8)
        .attr('fill', style.clrf)
        .attr('class', 'selectCircle')
        .attr('cx', data[0])
        .attr('cy', data[1])
        .attr('r', data[2]);
        // .on('click', selectItem);
}

function Path(data, container, style) {
    data = data.map((_, i, a) => a.slice(i * 2, i * 2 + 2)).filter((el) => el.length);

    var line = d3.line()
        .x(function(d) {
            return (d)[0];
        })
        .y(function(d) {
            return (d)[1];
        });
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

    return container.append('g').append('path')
        .data([data])
        .attr('class', 'path')
        .attr('d', line)
        .attr('d', function(d) {
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    
    return container.append("g").append("path")
        .data([data])
        .attr('class', 'path')
        .attr("d", line)
        .attr("d", function(d) {
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            return line(d);
        })
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        .attr('fill', 'none')
        .style('stroke-dasharray', '4px, 8px');
}

function IntersectionPoint(data, container, style) {
    container.append('text')
        .attr('class', 'textCoord')
        .attr('y', data[1] - 20)
        .attr('x', data[0])
        .attr('text-anchor', 'middle')
        .text('x: ' + Math.round(data[0]) + '; y: ' + Math.round(data[1]));
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        .attr("fill", "none")
        .style('stroke-dasharray', '4px, 8px');      
}
    
function IntersectionPoint(data, container, style) {
    container.append("text")
        .attr('class', 'textCoord')
        .attr("y", data[0] - 20)
        .attr("x", data[1])
        .attr('text-anchor', 'middle')
        .text('x: ' + data[0] + '; y: ' + data[1]);
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

    return container.append('circle')
        .attr('class', 'point')
        .style('stroke', style.clr)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        .style('stroke-width', style.lwidth)
=======
        .style('stroke-width', style.lwidth) 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
        .style('stroke-width', style.lwidth) 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
        .style('stroke-width', style.lwidth) 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        .attr('fill', style.clrf)
        .attr('cx', data[0])
        .attr('cy', data[1])
        .attr('r', data[2]);
}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

function AnimatedCircle(data, container, style) {
    var circle = Circle([0, 0, data[0]], container, style);
    circle.attr('class', 'animatedCircle');
    circle.transition().attr('transform', 'translate(' + data[1] + ',' + data[2] + ')');
    return circle;
}

function Line(data, container, style) {
    return container.append('line')
        .style('shape-rendering','crispEdges')
        .style('stroke', style.clr)
        .style('stroke-width', 1)
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    
function draggableCircle(data, container) {
    var draggableCircle = Circle(data, container);
    return draggableCircle
        .attr('class', 'draggableCircle')
        .style('fill-opacity', 0.5)
        .call(d3.drag()
            .on('drag', function() {
                container.select(this)
                    .attr('cx', d3.event.x)
                    .attr('cy', d3.event.y);
            }));
}

function resizingCircle(data, container) {
    var draggableCircle = draggableCircle(data, container, {x: data.x, y: data.y, size: data.size - 6}, {lwidth: 0, clrf: 'none', clr: 'none'});
    var resizingCircle = Circle(data, container);
    return resizingCircle
        .attr('class', 'resizingContainer')
        .style('cursor', 'nesw-resize') 
        .style('fill-opacity', 0.5)
        .call(d3.drag()
            .on('drag', function() {
                container.select('.resizingContainer')
                    .attr('r', function(c) {
                        return Math.pow(Math.pow(this.attributes.cx.value - d3.event.x, 2) 
                            + Math.pow(this.attributes.cy.value - d3.event.y, 2), 0.5);
                    });
                container.selectAll('.draggableCircle')
                    .attr('r', function(c) {
                        return Math.pow(Math.pow(this.attributes.cx.value - d3.event.x, 2) 
                            + Math.pow(this.attributes.cy.value - d3.event.y, 2), 0.5) - 6;
                    });
            }));
}

function AnimatedCircle(data, container, style) { 
    var circle = Circle([0, 0, data[0]], container, style);
    circle.attr('class', 'animatedCircle');
    circle.transition().attr("transform", "translate(" + data[1] + "," + data[2] + ")");
    return circle;
}
    
function Line(data, container, style) {    
    return container.append('line')
        .style('stroke', style.clr)
        // .style('stroke-width', style.lwidth)
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        .attr('class', 'line')
        .attr('x1', data[0])
        .attr('y1', data[1])
        .attr('x2', data[2])
        .attr('y2', data[3]);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
}

function Square(data, container, style) {
=======
}  

function Square(data, container, style) { 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
}  

function Square(data, container, style) { 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
}  

function Square(data, container, style) { 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    return container.append('rect')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
        .attr('fill', style.clrf)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        .style('fill-opacity', 0.8)
        .attr('class', 'selectSquare')
        .attr('x', data[0])
        .attr('y', data[1])
        .attr('width', data[2])
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        .style('fill-opacity', 0.7)
        .attr('class', 'selectSquare')
        .attr('x', data[0])
        .attr('y', data[1])
        .attr('width', data[2]) 
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        .attr('height', data[2])
        .attr('data-rotation', 0)
        .attr('rx', 0);
        // .on('click', selectItem);
}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

function Arc(data, container, style) {
=======
    
function Arc(data, container, style) {   
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
    
function Arc(data, container, style) {   
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
    
function Arc(data, container, style) {   
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    var arc = d3.arc()
        .innerRadius(data[2])
        .outerRadius(data[3])
        .startAngle(45 * (Math.PI / 180))
        .endAngle(10);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

    return container.append('g').append('path')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
        .style('fill-opacity', 0.8)
        .attr('class', 'selectArc')
        .attr('fill', style.clrf)
        .attr('d', arc)
        .attr('transform', 'translate(' + data[0] + ',' + data[1] +')');
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    
    return container.append("g").append("path")
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
        .style('fill-opacity', 0.5)
        .attr('class', 'selectArc')
        .attr('fill', style.clrf)
        .attr('d', arc)
        .attr('transform', "translate(" + data[0] + "," + data[1] +")");
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        // .on('click', selectItem);
}