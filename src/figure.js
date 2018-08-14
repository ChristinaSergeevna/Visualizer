class Figure {
	constructor (data, container) {
        var buff = data.input.trim().split(/\s+/);
        for (var i = 0; i < buff.length; ++i)
            buff[i] = parseFloat(buff[i]);
        this.data = buff;
        this.obj = null;
        this.style = {};
        //this.class = data.class;
        this.container = container;
    } 
}

module.exports = class Circle extends Figure {   
    create() {
        return this.container.append('circle')
        //.style('stroke', this.style.clr)
        //.style('stroke-width', this.style.lwidth) 
        .style('stroke', 'black')
        .style('stroke-width', 2) 
        // .style('fill-opacity', 0.5)
        //.attr('fill', this.style.clrf)
        .attr('class', 'selectCircle')
        .attr('cx', this.data[0])
        .attr('cy', this.data[1])
        .attr('r', this.data[2]);
        // .on('click', selectItem);
    }
}

// class Path extends Figure {
//     create() {
//         var line = d3.line()
//         .x(function(d) {
//             return (d)[0];
//         })
//         .y(function(d) {
//             return (d)[1];
//         });
    
//     return this.container.append("g").append("path")
//         .data([this.data])
//         .attr('class', 'path')
//         .attr("d", line)
//         .attr("d", function(d) {
//             return line(d);
//         })
//         .style('stroke', this.style.clr)
//         .style('stroke-width', this.style.lwidth)
//         .attr('fill', this.style.clrf)
//         .style('stroke-dasharray', '4px, 8px');
//     }        
// }
    
// class IntersectionPoint extends Figure {
//     create() {
//         this.container.append("text")
//             .attr('class', 'textCoord')
//             .attr("y", this.data.y - 20)
//             .attr("x", this.data.x)
//             .attr('text-anchor', 'middle')
//             .text('x: ' + this.data.x + '; y: ' + this.data.y);

//         return this.container.append('circle')
//             .attr('class', 'point')
//             .style('stroke', this.style.clr)
//             .style('stroke-width', this.style.lwidth) 
//             .attr('fill', this.style.clrf)
//             .attr('cx', this.data.x)
//             .attr('cy', this.data.y)
//             .attr('r', this.data.size);
//     }
// }
    
// class draggableCircle extends Figure {
//     create() {
//         var draggableCircle = this.addCircle();
//         return draggableCircle
//             .attr('class', 'draggableCircle')
//             .style('fill-opacity', 0.5)
//             .call(d3.drag()
//                 .on('drag', function() {
//                     container.select(this)
//                         .attr('cx', d3.event.x)
//                         .attr('cy', d3.event.y);
//                 }));
//     }
// }

// class resizingCircle extends Figure {
//     create() {
//         var draggableCircle = new Figure('draggableCircle', this.container, {x: this.data.x, y: this.data.y, size: this.data.size - 6}, {lwidth: 0, clrf: 'none', clr: 'none'});
//         var resizingCircle = this.addCircle();
//         return resizingCircle
//             .attr('class', 'resizingContainer')
//             .style('cursor', 'nesw-resize')
//             .style('fill-opacity', 0.5)
//             .call(d3.drag()
//                 .on('drag', function() {
//                     container.select('.resizingContainer')
//                         .attr('r', function(c) {
//                             return Math.pow(Math.pow(this.attributes.cx.value - d3.event.x, 2) 
//                                 + Math.pow(this.attributes.cy.value - d3.event.y, 2), 0.5);
//                         });
//                     container.selectAll('.draggableCircle')
//                         .attr('r', function(c) {
//                             return Math.pow(Math.pow(this.attributes.cx.value - d3.event.x, 2) 
//                                 + Math.pow(this.attributes.cy.value - d3.event.y, 2), 0.5) - 6;
//                         });
//                 }));
//     }
// }

// class AnimatedCircle extends Figure { 
//     create() {
//         var circle = this.container.append('circle')
//             .style('stroke', this.style.clr)
//             .style('stroke-width', this.style.lwidth) 
//             .attr('fill', this.style.clrf)
//             .attr('class', 'animatedCircle')
//             .attr('r', this.data.size);
//         var linepath = new('path', this.container, this.data, this.style);
//         circle.transition()
//             .attr("transform", "translate(" + (this.data[0]) + ")");
            
//         dataCircles.push(this.data);
//         dataAnim.push(this.anim);
//         animated.push(circle);
//         return circle;
//     }
// }
    
// class Line extends Figure {    
//     create() {
//         return this.container.append('line')
//             .style('stroke', this.style.clr)
//             .style('stroke-width', this.style.lwidth)
//             .attr('class', 'line')
//             .attr('x1', this.data.x1)
//             .attr('y1', this.data.y1)
//             .attr('x2', this.data.x2)
//             .attr('y2', this.data.y2);
//     }  
// }

// class Square extends Figure { 
//     create() {
//         return container.append('rect')
//             .style('stroke', this.style.clr)
//             .style('stroke-width', this.style.lwidth)
//             .attr('fill', this.style.clrf)
//             .attr('class', 'selectSquare')
//             .attr('x', this.data.x)
//             .attr('y', this.data.y)
//             .attr('width', this.data.size) 
//             .attr('height', this.data.size)
//             .attr('data-rotation', 0)
//             .attr('rx', 0)
//             .on('click', selectItem);
//     }
// }
    
// class Arc extends Figure {   
//     create() {
//         var arc = d3.arc()
//             .innerRadius(this.data.r1)
//             .outerRadius(this.data.r2)
//             .startAngle(45 * (Math.PI / 180))
//             .endAngle(10);
        
//         return this.container.append("g").append("path")
//             .style('stroke', this.style.clr)
//             .style('stroke-width', this.style.lwidth)
//             .style('fill-opacity', 0.5)
//             .attr('class', 'selectArc')
//             .attr('fill', this.style.clrf)
//             .attr('d', arc)
//             .attr('transform', "translate(" + this.data.x + "," + this.data.y +")")
//             .on('click', selectItem);
//     }
// }