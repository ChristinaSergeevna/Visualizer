var Slider = require('./Slider.js')

module.exports = class Grid {
    static create() {
        var gX = null, gY = null,
            currentTransform = null,
            range = [0.5, 20], step = 0,
            width = d3.select('.view').attr('width'),
            height = d3.select('.view').attr('height');

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
            .scaleExtent(range)
            .translateExtent([[-width * 2, -height * 2], [width * 2, height * 2]])
            .on('zoom', function() {
                currentTransform = d3.event.transform;
                d3.select('.viewg').attr('transform', currentTransform);
                gX.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
                gY.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
                // d3.select('.textCoord').attr('transform', function(d) {
                //     return "translate(" + xScale(d[0]) + "," + yScale(d[1]) + ")";
                // });
            });

        function fun(args, xVal) {
            args.zoom.scaleTo(d3.select('.svg'), xVal);
        }

        var slider = new Slider(300, 0, [0, 20], 'grid', fun, { zoom: zoom}, 1);

        function reset() {
            d3.select('.svg').transition()
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
        }

        d3.select('.inset_content').append('button')
                .attr('class', 'button')
                .style('top', '40px')
                .style('left', '30px')
                .on('click', reset)
                .append('text')
                    .text('Reset');

        if (currentTransform)
            d3.select('.viewg').attr('transform', currentTransform);

        gX = d3.select('.svg').append('g')
            .style('stroke-opacity', 0.4)
            .attr('fill', 'none')
            .attr('stroke-width', 1)
            .style('shape-rendering', 'crispEdges')
            .style('text-anchor', 'middle')
            .attr('class', 'axis axis--x')
            .call(xAxis);
        gY = d3.select('.svg').append('g')
            .style('stroke-opacity', 0.4)
            .attr('fill', 'none')
            .attr('stroke-width', 1)
            .style('shape-rendering', 'crispEdges')
            .attr('class', 'axis axis--y')
            .call(yAxis);

        d3.select('.svg')
            .call(zoom)
            .on('mousemove', function() {
                var xy = d3.mouse(this);
                var xy1 = [xScale.invert(xy[0]), yScale.invert(xy[1])];
                var transform = d3.zoomTransform(d3.select('.viewg').node());
                var xy2 = transform.invert(xy1);
                d3.select('.coord').text(function() {
                        return Math.round(xy2[0]) + ', ' + Math.round(xy2[1]);
                    });
            })
            // .on('wheel.zoom', null)
            .on('dblclick.zoom', null);
    }
}