module.exports = class Figure {
	constructor(cl, data, container, style) {
        this.data = data;
        this.obj = null;
        this.style = style;
        this.class = cl;
        this.container = container;
        this.datapath = data.slice(1, data.length);

        var item = this.class;
        switch (item) {
            case 'selectSquare':
            case 'square':
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
        }
    }
}

function Circle(data, container, style) {
    return container.append('circle')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
        .style('fill-opacity', 0.8)
        .attr('fill', style.clrf)
        .attr('class', 'selectCircle')
        .attr('cx', data[0])
        .attr('cy', data[1])
        .attr('r', data[2]);
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

    return container.append('g').append('path')
        .data([data])
        .attr('class', 'path')
        .attr('d', line)
        .attr('d', function(d) {
            return line(d);
        })
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
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

    return container.append('circle')
        .attr('class', 'point')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
        .attr('fill', style.clrf)
        .attr('cx', data[0])
        .attr('cy', data[1])
        .attr('r', data[2]);
}

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
        .attr('class', 'line')
        .attr('x1', data[0])
        .attr('y1', data[1])
        .attr('x2', data[2])
        .attr('y2', data[3]);
}

function Square(data, container, style) {
    return container.append('rect')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
        .attr('fill', style.clrf)
        .style('fill-opacity', 0.8)
        .attr('class', 'selectSquare')
        .attr('x', data[0])
        .attr('y', data[1])
        .attr('width', data[2])
        .attr('height', data[2])
        .attr('data-rotation', 0)
        .attr('rx', 0);
        // .on('click', selectItem);
}

function Arc(data, container, style) {
    var arc = d3.arc()
        .innerRadius(data[2])
        .outerRadius(data[3])
        .startAngle(45 * (Math.PI / 180))
        .endAngle(10);

    return container.append('g').append('path')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
        .style('fill-opacity', 0.8)
        .attr('class', 'selectArc')
        .attr('fill', style.clrf)
        .attr('d', arc)
        .attr('transform', 'translate(' + data[0] + ',' + data[1] +')');
}