module.exports = class Ruler {
    static create() {
        var width = d3.select('.view').attr('width'),
            height = d3.select('.view').attr('height'),
            rulerContainer = null,
            pointsRuler = [{}];

        var xScale = d3.scaleLinear()
            .domain([-width / 2, width / 2])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([-height / 2, height / 2])
            .range([height, 0]);

        d3.select('.viewg').append('g')
                .attr('class', 'itemContainer')
                .attr('transform', () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');

         function snapToGrid(p, r) {
            return Math.round(p / r) * r;
        }

        function dragCircle(circle, mouse) {
            circle.attr('cx', mouse[0]).attr('cy', mouse[1]);
            var rp = d3.select('.left_ruler_point');
            var lp = d3.select('.right_ruler_point');
            var x1 = snapToGrid(lp.attr('cx'), 1);
            var y1 = snapToGrid(lp.attr('cy'), 1);
            var x2 = snapToGrid(rp.attr('cx'), 1);
            var y2 = snapToGrid(rp.attr('cy'), 1);
            var line = d3.select('.ruler_line')
                .attr('x1', x1)
                .attr('y1', y1)
                .attr('x2', x2)
                .attr('y2', y2)
                .style('stroke', 'blue');
            d3.select('.text')
                .attr('y', +y1 + (y2 - y1) / 2 - 10)
                .attr('x', +x1 + (x2 - x1) / 2)
                .text(Math.round(line.node().getTotalLength() * 100) / 100);
        }

        function createCircle(x, y, classname) {
            rulerContainer.append('circle')
                .attr('class', classname)
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 20)
                .attr('fill-opacity', 0.0)
                .call(d3.drag()
                    .on('drag', function(data) {
                        dragCircle(d3.select(this), d3.mouse(this));
                    })
                    .on('end', function() {
                        d3.select('.ruler_line')
                            .style('stroke', 'black');
                    })
                );
        }

        d3.select('.inset_content').append('button')
            .attr('class', 'button')
            .style('top', '260px')
            .style('left', '30px')
            .on('click', function() {
                d3.select('.itemContainer')
                    .lower()
                    .append('rect')
                    .attr('class', 'backdropContainer')
                    .attr('x', -width * 2)
                    .attr('y', -height * 2)
                    .attr('height', height * 3)
                    .attr('width', width * 3)
                    .attr('fill-opacity', 0.0)
                    .call(d3.drag()
                        .on('start', function(data) {
                            d3.select('.left_ruler_point').remove();
                            d3.select('.right_ruler_point').remove();
                            d3.select('.ruler_line').remove();
                            d3.select('.text').remove();
                            var mouse = d3.mouse(this);
                            var x = snapToGrid(mouse[0], 1);
                            var y = snapToGrid(mouse[1], 1);
                            pointsRuler.push({ x: x, y : y});
                            createCircle(x, y, 'left_ruler_point');
                            createCircle(x, y, 'right_ruler_point');
                            var line = rulerContainer.append('line')
                                .attr('class', 'ruler_line')
                                .style('opacity', 0.3)
                                .attr('x1', x).attr('y1', y)
                                .attr('x2', x).attr('y2', y)
                                .style('stroke-dasharray', '0.9 0.1')
                                .style('stroke', 'black')
                                .style('stroke-width', 7)
                                .on('dblclick.zoom', function() {
                                    d3.selectAll('.backdropContainer').remove();
                                    d3.select('.left_ruler_point').remove();
                                    d3.select('.right_ruler_point').remove();
                                    d3.select('.ruler_line').remove();
                                    d3.select('.text').remove();
                                });
                            rulerContainer.append('text')
                                .attr('class', 'text')
                                .attr('text-anchor', 'middle')
                                .text(Math.round(line.node().getTotalLength() * 1000) / 1000);
                        })
                        .on('drag', function(data) {
                            dragCircle(d3.select('.right_ruler_point'), d3.mouse(this));
                        })
                        .on('end', function(data) {
                            d3.select('.ruler_line')
                                .style('stroke', 'black');
                            d3.selectAll('.backdropContainer').remove();
                        })
                    );
            })
            .append('text')
                .text('Ruler');

        rulerContainer = d3.select('.viewg').selectAll('.backdrop')
                .attr('class', 'rulerContainer')
                .data(pointsRuler).enter().append('g')
                .attr('transform', () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');

        d3.select('.itemContainer')
            .lower()
            .append('rect')
            .attr('class', 'backdrop')
            .attr('x', -width * 2)
            .attr('y', -height * 2)
            .attr('height', height * 3)
            .attr('width', width * 3)
            .attr('fill-opacity', 0.0);
    }
}