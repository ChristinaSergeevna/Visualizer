var Grid = require('./Grid.js')

module.exports = class Ruler {
    constructor(view, grid, width, height) {
        var backdropContainer = null;
        var rulerContainer = null;
        var pointsRuler = [{}];
        var draggedSvg = null;
        var backdrop = null;
        var t = 0;
        var text = null;
        var dragline = null;

        var xScale = d3.scaleLinear()
            .domain([-width / 2, width / 2])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([-height / 2, height / 2])
            .range([height, 0]);

        var buttonRuler = d3.select('.inset_content').append('button')
            .attr('class', 'button')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '260px')
            .style('left', '30px')
            .style('width', '80px')
            .on('click', function() {
                draggedSvg = backdropContainer.append('circle')
                    .attr('r', 50)
                    .attr('fill', 'none');
                t += 1;
            })
            .append('text')
                .text('Ruler');

        var dragme = d3.drag()
            .on('start', function(d) {
                var thisdragY = d3.select(this).attr('cy');
                var thisdragX = d3.select(this).attr('cx');
                var thisdragR = +d3.select(this).attr('r');

                if (t > 1) {
                    var coord = d3.mouse(this);
                    var xx = coord[0], yy = coord[1];
                    d3.selectAll('.lruler').remove();
                    d3.selectAll('.ruler').attr('cx', xx).attr('cy', yy);
                    rulerContainer.selectAll('.ruler2').remove();
                    rulerContainer.selectAll('.text').remove();
                }
                dragline = rulerContainer.append('line')
                        .attr('class', 'lruler')
                        .style('opacity', 0.5)
                        .style('stroke-linecap', 'round')
                        .attr('x1', thisdragX).attr('y1', thisdragY)
                        .attr('x2', thisdragX).attr('y2', thisdragY)
                        .style('stroke', 'black').style('stroke-width', '5');

                rulerContainer.append('circle')
                    .attr('class', 'ruler2')
                    .attr('cx', thisdragX)
                    .attr('cy', thisdragY)
                    .attr('r', 30)
                    .style('fill-opacity', 0.0);
            })
            .on('drag', function() {
                var coord = d3.mouse(this);
                var xx = coord[0], yy = coord[1];
                d3.selectAll('.lruler').attr('x2', xx).attr('y2', yy).style('stroke', 'blue');
                d3.selectAll('.ruler2').attr('cx', xx).attr('cy', yy);
            })
            .on('end', function(d) {
                d3.selectAll('.ruler2').call(d3.drag()
                    .on('drag', function() {
                        var coord = d3.mouse(this);
                        var xx = coord[0], yy = coord[1];
                        d3.selectAll('.lruler').attr('x2', xx).attr('y2', yy).style('stroke', 'blue');
                        d3.selectAll('.ruler2').attr('cx', xx).attr('cy', yy);
                        text
                            .attr('y', (yy > dragline.attr('y1') ? yy - 30 : yy + 30))
                            .attr('x', (xx > dragline.attr('x1') ? xx - 30 : xx + 30))
                            .attr('text-anchor', 'middle')
                            .text(Math.round(dragline.node().getTotalLength()));
                    })
                    .on('end', function() {
                        d3.selectAll('.lruler').style('stroke', 'black');
                    }));
                d3.select(this).call(d3.drag()
                    .on('drag', function() {
                        var coord = d3.mouse(this);
                        var xx = coord[0], yy = coord[1];
                        d3.selectAll('.lruler').attr('x1', xx).attr('y1', yy).style('stroke', 'blue');
                        d3.selectAll('.ruler').attr('cx', xx).attr('cy', yy);
                        text
                            .attr('text-anchor', 'middle')
                            .text(Math.round(dragline.node().getTotalLength()));
                    })
                    .on('end', function() {
                        d3.selectAll('.lruler').style('stroke', 'black');
                    }));
                d3.selectAll('.lruler').style('stroke', 'black');
                text = rulerContainer.append('text')
                    .attr('class', 'text')
                    .attr('y', (dragline.attr('y1') < dragline.attr('y2') ? dragline.attr('y2') - 30 : dragline.attr('y2') + 30))
                    .attr('x', (dragline.attr('x1') < dragline.attr('x2') ? dragline.attr('x2') - 30 : dragline.attr('x2') + 30))
                    .attr('text-anchor', 'middle')
                    .text(Math.round(dragline.node().getTotalLength()));
            });

        backdropContainer = view.append('g')
            .attr('transform', function() {
                return 'translate(' + xScale(0) + ',' + yScale(0) + ')';
            });

        rulerContainer = view.selectAll('.backdrop')
                .attr('class', 'rulerContainer')
                .data(pointsRuler).enter().append('g')
                .attr('transform', () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');

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
                if (draggedSvg) {
                    draggedSvg.remove();
                    draggedSvg = null;
                    var mouse = d3.mouse(this);
                    var x = mouse[0], y = mouse[1];
                    pointsRuler.push({ x: x, y: y });
                    var cir = rulerContainer.append('circle')

                    rulerContainer.append('circle')
                        .attr('class', 'ruler')
                        .attr('cx', x).attr('cy', y)
                        .attr('r', 30)
                        .style('fill-opacity', 0.0)
                        .call(dragme);

                    view.on('mousemove', function() {
                        // cir.call(dragme);

                    })

                }
            });
    }
}