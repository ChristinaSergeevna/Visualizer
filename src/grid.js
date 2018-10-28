var Slider = require('./Slider.js')

module.exports = class Grid {
    constructor(svg, view, width, height) {
        var gX = null, gY = null;
        var currentTransform = null;
        var range = [0, 5], step = 0,
            widthSlider = 80, xVal = 0;

        var xScale = d3.scaleLinear()
            .domain([-width / 2, width / 2])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([-height / 2, height / 2])
            .range([0, height]);

        var xAxis = d3.axisTop(xScale)
            .ticks((width + 2) / (height + 2) * 10)
            .tickSize(-height);
        var yAxis = d3.axisLeft(yScale)
            .ticks(10)
            .tickSize(-width);

        var zoom = d3.zoom()
            .scaleExtent([0.5, 5])
            .translateExtent([[-width * 2, -height * 2], [width * 2, height * 2]])
            .on('zoom', function() {
                currentTransform = d3.event.transform;
                view.attr('transform', currentTransform);
                gX.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
                gY.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
            });

        function fun(args, xVal) {
            args.zoom.scaleTo(args.svg, xVal);
        }

        var slider = new Slider(300, 0, [0.5, 5], 'sli', fun, { zoom: zoom , svg: svg});

        var reset = d3.select('.inset_content').append('button')
                .attr('class', 'button')
                .style('display', 'block')
                .style('position', 'absolute')
                .style('top', '40px')
                .style('left', '30px')
                .style('text', 'Reset')
                .style('width', '80px')
                .on('click', function() {
                    svg.transition()
                        .duration(750)
                        .call(zoom.transform, d3.zoomIdentity);
                    slider.slider.transition()
                        .duration(750)
                        .tween('drag', function () {
                            var i = d3.interpolate(slider.handle.attr('cx'), 8);
                            return function (t) {
                                var x = slider.xScaleSlider.invert(i(t));
                                slider.handle.attr('cx', i(t));
                            }
                        });
                })
                .append('text')
                    .text('Reset');

        if (currentTransform)
            view.attr('transform', currentTransform);

        gX = svg.append('g')
            .style('stroke-opacity', 0.4)
            .attr('fill', 'none')
            .attr('stroke-width', 1)
            .style('shape-rendering', 'crispEdges')
            .style('text-anchor', 'middle')
            .attr('class', 'axis axis--x')
            .call(xAxis);
        gY = svg.append('g')
            .style('stroke-opacity', 0.4)
            .attr('fill', 'none')
            .attr('stroke-width', 1)
            .style('shape-rendering', 'crispEdges')
            .attr('class', 'axis axis--y')
            .call(yAxis);

        svg
            .call(zoom)
            .on('mousemove', function() {
                var xy = d3.mouse(this);
                var xy1 = [xScale.invert(xy[0]), yScale.invert(xy[1])];
                var transform = d3.zoomTransform(svg.node());
                var xy2 = transform.invert(xy1);
                d3.select('.coord').text(function() {
                        return Math.round(xy2[0]) + ', ' + Math.round(xy2[1]);
                    });
            })
            .on('wheel.zoom', null)
            .on('dblclick.zoom', null);

    }
}