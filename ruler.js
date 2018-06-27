var backdropContainer = null, rulerContainer = null,
    draggedSvg = null, backdrop = null, t = 0;
var pointsRuler = [{}];  

var text = null, dragline = null;
var dragme = d3.drag()
        .on("start", function(d) {
            var thisdragY = d3.select(this).attr("cy");
            var thisdragX = d3.select(this).attr("cx");
            var thisdragR = +d3.select(this).attr("r");

            if (t > 1) {
                var coord = d3.mouse(this); 
                var xx = coord[0], yy = coord[1];
                d3.selectAll('.lruler').remove();
                d3.selectAll('.ruler').attr("cx", xx).attr('cy', yy);
                rulerContainer.selectAll('.ruler2').remove();
                rulerContainer.selectAll('.text').remove();
            }
            dragline = rulerContainer.append("line")
                    .attr('class', 'lruler')
                    .style('fill-opacity', 0.0)
                    .attr("x1", thisdragX).attr("y1", thisdragY)
                    .attr("x2", thisdragX).attr("y2", thisdragY)
                    .style("stroke", "black").style("stroke-width", "1");
    
            rulerContainer.append("circle") 
                .attr('class', 'ruler2')
                .attr("cx", thisdragX)
                .attr("cy", thisdragY)
                .attr("r", thisdragR / 6)
                .style('fill-opacity', 0.5)
                .attr("fill", "black");
            rulerContainer.append("circle") 
                .attr('class', 'ruler2')
                .attr("cx", thisdragX)
                .attr("cy", thisdragY)
                .attr("r", thisdragR)
                .style('fill-opacity', 0.0);
        })
        .on("drag", function() {
            var coord = d3.mouse(this); 
            var xx = coord[0], yy = coord[1];
            d3.selectAll('.lruler').attr("x2", xx).attr("y2", yy).style("stroke", "black");
            d3.selectAll(".ruler2").attr("cx", xx).attr("cy", yy).attr('fill', 'blue');
        })
        .on("end", function(d) {
            d3.selectAll(".ruler2").call(d3.drag()
                .on("drag", function() {
                    var coord = d3.mouse(this); 
                    var xx = coord[0], yy = coord[1];
                    d3.selectAll('.lruler').attr("x2", xx).attr("y2", yy);
                    d3.selectAll(".ruler2").attr("cx", xx).attr("cy", yy).attr('fill', 'blue');
                    text
                        .attr("y", (yy > dragline.attr("y1") ? yy - 30 : yy + 30))
                        .attr("x", (xx > dragline.attr("x1") ? xx - 30 : xx + 30))
                        .attr('text-anchor', 'middle')
                        .text(Math.round(dragline.node().getTotalLength() * 1000) / 1000);
                })
                .on("end", function() {
                    d3.selectAll(".ruler2").attr('fill', 'black');
                }));
            d3.select(this).call(d3.drag()
                .on("drag", function() {
                    var coord = d3.mouse(this); 
                    var xx = coord[0], yy = coord[1];
                    d3.selectAll('.lruler').attr("x1", xx).attr("y1", yy).style("stroke", "black");
                    d3.selectAll(".ruler").attr("cx", xx).attr("cy", yy).attr('fill', 'blue');
                    text
                        .attr('text-anchor', 'middle')
                        .text(Math.round(dragline.node().getTotalLength() * 1000) / 1000);
                })
                .on("end", function() {
                    d3.selectAll(".ruler").attr('fill', 'black');
                }));
            d3.selectAll(".ruler2").attr('fill', 'black');
            text = rulerContainer.append("text")
                .attr('class', 'text')
                .attr("y", (dragline.attr("y1") < dragline.attr("y2") ? dragline.attr("y2") - 30 : dragline.attr("y2") + 30))
                .attr("x", (dragline.attr("x1") < dragline.attr("x2") ? dragline.attr("x2") - 30 : dragline.attr("x2") + 30))
                .attr('text-anchor', 'middle')
                .text(Math.round(dragline.node().getTotalLength() * 1000) / 1000);
        });

function initRulerContainer() {
    backdropContainer = view.append('g')
        .attr('transform', function() {
            return 'translate(' + xScale(0) + ',' + yScale(0) + ')';
        });
    rulerContainer = view.selectAll(".backdrop")
            .attr("class", "rulerContainer")
            .data(pointsRuler).enter().append('g')
            .attr("transform", () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');

    backdrop = backdropContainer
        .lower()
        .append('rect')
        .attr('class', 'backdrop')
        .attr('x', -width * 2)
        .attr('y', -height * 2)
        .attr('height', height * 3)
        .attr('width', width * 3)
        .attr('opacity', '0');

        backdrop.on('mousedown', function() {
            if (draggedSvg && svg) {
                if (draggedSvg) { 
                    draggedSvg.remove();
                    draggedSvg = null;
                }
                var mouse = d3.mouse(this);
                var x = mouse[0], y = mouse[1];
                pointsRuler.push({ x: x, y: y });
                rulerContainer.append('circle')
                    .attr('class', 'ruler')
                    .attr('cx', x).attr('cy', y)
                    .attr('r', 5)
                    .style('fill-opacity', 0.5)
                    .attr('fill', 'black');
                rulerContainer.append('circle')
                    .attr('class', 'ruler')
                    .attr('cx', x).attr('cy', y)
                    .attr('r', 30)
                    .style('fill-opacity', 0.0)
                    .call(dragme);
            }
        });
}

var ruler = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '50px')
        .style('left', '45px')
        .append("input")
            .datum({})
            .attr("type", "button")
            .attr('value', 'Ruler')
            .style('width', '80px')
            .on("click", function() {
                draggedSvg = backdropContainer.append('circle')
                    .attr('r', 50)
                    .attr('fill', 'none');
                t += 1;
            });

buttonStyle(ruler);