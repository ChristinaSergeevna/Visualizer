module.exports = class Object {
	constructor(cl, type, data, container, style) {
        this.data = data;
        this.obj = null;
        this.style = style;
        this.class = cl;
        this.container = container;
        this.datapath = data.slice(1, data.length);
        this.create = function() {
            var item = this.class;
            switch (item) {
                case 'square':
                    this.obj = Square(this.data, type, this.container, this.style);
                    break;
                case 'circle':
                    this.obj = Circle(this.data, type, this.container, this.style);
                    break;
                case 'animatedcircle':
                   this.obj = AnimatedCircle(this.data, type, this.container, this.style);
                   break;
                case 'arc':
                    this.obj = Arc(this.data, type, this.container, this.style);
                    break;
                case 'line':
                    this.obj = Line(this.data, type, this.container, this.style);
                    break;
                case 'point':
                    this.obj = IntersectionPoint(this.data, type, this.container, this.style);
                    break;
                case 'path':
                    this.obj = Path(this.data, type, this.container, this.style);
                    break;
                case 'segment':
                    this.obj = Segment(this.data, type, this.container, this.style);
                    break;
                case 'angle':
                    this.obj = Angle(this.data, type, this.container, this.style);
                    break;
                default:
                    break;
            }
        }
        this.create();
    }
}

function Text(data, text, type, container) {
    return container.append('text')
        .attr('id', type)
        .attr('class', 'text')
        .attr('x', data[0])
        .attr('y', data[1])
        .text(text)
        .attr('font-size', '12px')
        .attr('text-anchor', 'middle');
}

function Circle(data, type, container, style) {
    return container.append('circle')
        .datum(style)
        .styles(function(d) { return d; })
        .attr('id', type)
        .attr('class', 'circle')
        .attr('cx', data[0])
        .attr('cy', data[1])
        .attr('r', data[2]);
}

function Path(data, type, container, style) {
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
        .attr('id', type)
        .attr('class', 'path')
        .attr('d', line)
        .attr('d', function(d) {
            return line(d);
        })
        .style('stroke', style.stroke)
        .attr('fill', 'none')
        .style('stroke-dasharray', '4px, 8px');
}

function IntersectionPoint(data, type, container, style) {
    var margin = {top: 40, right: 40, bottom: 50, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var xScale = d3.scaleLinear()
        .domain([-width / 2, width / 2])
        .range([0, width]);
    var yScale = d3.scaleLinear()
        .domain([-height / 2, height / 2])
        .range([0, height]);

    Text([data[0], data[1] - 20], Math.round(data[0]) + ', ' + Math.round(data[1]), type, container);

    // container.append('text')
    //     .attr('id', type)
    //     .attr('class', 'textCoord')
    //     // .attr('data', [data[0], data[1] - 20])
    //     // .attr('transform', function(d) {
    //     //             return "translate(" + xScale(d[0]) + "," + yScale(d[1]) + ")";
    //     //         });

    return container.append('circle')
        .attr('id', type)
        .attr('class', 'point')
        .datum(style)
        .styles(function(d) { return d; })
        .attr('cx', data[0])
        .attr('cy', data[1])
        .attr('r', 3);
}

function AnimatedCircle(data, type, container, style) {
    var circle = Circle([0, 0, data[0]], type, container, style);
    circle.attr('class', 'animatedCircle');
    circle.transition().attr('transform', 'translate(' + data[1] + ',' + data[2] + ')');
    return circle;
}

function Line(data, type, container, style) {
    return container.append('line')
        .style('shape-rendering','crispEdges')
        .style('stroke', style.stroke)
        .style('stroke-width', 1)
        .attr('id', type)
        .attr('class', 'line')
        .attr('x1', data[0])
        .attr('y1', data[1])
        .attr('x2', data[2])
        .attr('y2', data[3]);
}

function Square(data, type, container, style) {
    return container.append('rect')
        .datum(style)
        .styles(function(d) { return d; })
        .attr('id', type)
        .attr('class', 'square')
        .attr('x', data[0])
        .attr('y', data[1])
        .attr('width', data[2])
        .attr('height', data[2])
        .attr('data-rotation', 0)
        .attr('rx', 0);
}

function Arc(data, type, container, style) {
    var arc = d3.arc()
        .innerRadius(data[2])
        .outerRadius(data[3])
        .startAngle(45 * (Math.PI / 180))
        .endAngle(10);

    return container.append('g').append('path')
        .datum(style)
        .styles(function(d) { return d; })
        .attr('id', type)
        .attr('class', 'arc')
        .attr('d', arc)
        .attr('transform', 'translate(' + data[0] + ',' + data[1] +')');
}

function Segment(data, type, container, style) {
    var seg = container.append('g').append('path')
        .datum(style)
        .styles(function(d) { return d; })
        .style('fill', 'IndianRed')
        .attr('d', function() {
            return data[0];
        })
        .attr('id', type)
        .attr('class', 'segment');

    Text(data[2], 'S = ' + data[1], type, container);
    return seg;
}

function angleThreePoints(p1, p2, p3) {
    function calc(p1, p2) {
        return Math.sqrt(Math.pow((p1[0] - p2[0]), 2) + Math.pow((p1[1] - p2[1]), 2));
    }

    var p12 = calc(p1, p2);
    var p13 = calc(p1, p3);
    var p23 = calc(p2, p3);

    var resultRadian = Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13));
    var resultDegree = Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13)) * 180 / Math.PI;

    return {rad: resultRadian, deg: resultDegree};
}

function Angle(data, type, container, style) {
    var angle = angleThreePoints(data[0], data[1], data[2]);
    var startAngle = angleThreePoints(data[0], [data[0][0], -data[1][1]], data[1]);

    var angleContainer = container.append('g')
            .attr('transform', 'translate(' + data[0][0] + ',' + data[0][1] + ')');

    var differenceArc = angleContainer.append('g').datum({});

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(50)
        .startAngle(startAngle.rad)
        .endAngle(startAngle.rad + angle.rad);

    differenceArc.append('path')
        .attr('id', type)
        .attr('class', 'angle')
        .style('fill', style.fill)
        .style('fill-opacity', style['fill-opacity'])
        .attr('d', arc());

    differenceArc.append('text')
        .attr('id', type)
        .attr('transform', 'translate(' + arc.centroid() + ')')
        .text(Math.round(angle.deg) + 'º');

    return differenceArc;
}