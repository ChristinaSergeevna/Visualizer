// module.exports = class Figures {
        
    var itemContainer = null, pointsItems = [{}];
    var circleStyle = { lwidth: 2.5, clrf: '#87CEEB', clr: 'none' },
        squareStyle = { lwidth: 2.5, clrf: '#3CB371', clr: 'none' },
        lineStyle = { lwidth: 1.5, clrf: 'none', clr: 'black' },
        pointStyle = { lwidth: 3, clrf: '#8B0000', clr: '#DC143C' };
    
    function initItemContainer() {
        itemContainer = view.selectAll("g")
                .attr("class", "itemContainer")
                .data(pointsItems).enter().append('g')
                .attr("transform", () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');
    }
    
    /////////////////////////// figures //////////////////////////////
    
    function addPath(container, data, style = lineStyle) {
        var line = d3.line()
            .x(function(d) {
                return (d)[0];
            })
            .y(function(d) {
                return (d)[1];
            });
        
        return container.append("g").append("path")
            .data([data])
            .attr('class', 'path')
            .attr("d", line)
            .attr("d", function(d) {
                return line(d);
            })
            .style('stroke', style.clr)
            .style('stroke-width', style.lwidth)
            .attr('fill', style.clrf)
            .style('stroke-dasharray', '4px, 8px');
    }
    
    function intersectionPoint(container, data, style = pointStyle) {
        container.append("text")
            .attr('class', 'textCoord')
            .attr("y", data.y - 20)
            .attr("x", data.x)
            .attr('text-anchor', 'middle')
            .text('x: ' + data.x + '; y: ' + data.y);
    
        return container.append('circle')
            .attr('class', 'point')
            .style('stroke', style.clr)
            .style('stroke-width', style.lwidth) 
            .attr('fill', style.clrf)
            .attr('cx', data.x)
            .attr('cy', data.y)
            .attr('r', data.size);
    }
    
    function interactiveCircle(container, data, style = circleStyle) {
        var resizingCircle = addCircle(container, data, style);
        resizingCircle
            .style('cursor', 'nesw-resize')
            .style('fill-opacity', 0.5)
            .attr('class', 'resizingContainer')
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
    
        var draggableCircle = addCircle(container, {x: data.x, y: data.y, size: data.size - 6}, {lwidth: 0, clrf: 'none', clr: 'none'});
        return draggableCircle
            .style('fill-opacity', 0.5)
            .attr('class', 'draggableCircle')
            .call(d3.drag()
                .on('drag', function() {
                    container.select(this)
                        .attr('cx', d3.event.x)
                        .attr('cy', d3.event.y);
                }));
    }
    
    function addLine(container, data, style = lineStyle) {       
        return container.append('line')
            .style('stroke', style.clr)
            .style('stroke-width', style.lwidth)
            .attr('class', 'line')
            .attr('x1', data.x1)
            .attr('y1', data.y1)
            .attr('x2', data.x2)
            .attr('y2', data.y2);
    }
    
    function addCircle(container, data, style = circleStyle) {   
        return container.append('circle')
            .style('stroke', style.clr)
            .style('stroke-width', style.lwidth) 
            // .style('fill-opacity', 0.5)
            .attr('fill', style.clrf)
            .attr('class', 'selectCircle')
            .attr('cx', data.x)
            .attr('cy', data.y)
            .attr('r', data.size)
            .on('click', selectItem);
    }
    
    function addSquare(container, data, style = squareStyle) {   
        return container.append('rect')
            .style('stroke', style.clr)
            .style('stroke-width', style.lwidth)
            .attr('fill', style.clrf)
            .attr('class', 'selectSquare')
            .attr('x', data.x)
            .attr('y', data.y)
            .attr('width', data.size) 
            .attr('height', data.size)
            .attr('data-rotation', 0)
            .attr('rx', 0)
            .on('click', selectItem);
    }
    
    function addArc(container, data, style = circleStyle) {   
        var arc = d3.arc()
            .innerRadius(data.r1)
            .outerRadius(data.r2)
            .startAngle(45 * (Math.PI / 180))
            .endAngle(10);
        
        return container.append("g").append("path")
            .style('stroke', style.clr)
            .style('stroke-width', style.lwidth)
            .style('fill-opacity', 0.5)
            .attr('class', 'selectArc')
            .attr('fill', style.clrf)
            .attr('d', arc)
            .attr('transform', "translate(" + data.x + "," + data.y +")")
            .on('click', selectItem);
    }   
// }