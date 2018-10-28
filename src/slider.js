module.exports = class Slider {
    constructor(top, left, range, cl, fun, args) {
        var step = 0, widthSlider = 70, xVal = 0;

        var slider = d3.select('.inset_content').append('svg')
            .attr('width', widthSlider + 50)
            .attr('height', 50)
            .attr('transform', 'translate(' + left +', '+ top + ')')
                .append('g')
                    .classed('slider', true)
                    .attr('transform', 'translate(' + (35) +', '+ (10) + ')');

        var tf = ['slower', 'faster'];

        var xScaleSlider = d3.scaleLinear()
            .domain(range)
            .range([0, widthSlider])
            .clamp(true);
        var rangeValues = d3.range(range[0], range[1], step || 1.5).concat(range[1]);
        var xAxisSlider = d3.axisBottom(xScaleSlider)
            .tickValues(rangeValues)
            .tickFormat(function (d) {
                if (d == 0.001)
                    return tf[0];
                else if (d == 0.51)
                    return tf[1];
                else
                    return d + 'x';
        });

        xScaleSlider.clamp(true);

        var drag = d3.drag()
            .on('start.interrupt', function () {
                slider.interrupt();
            })
            .on('start drag', function () {
                dragged(d3.event.x);
            });

        var track = slider.append('line')
            .attr('class', 'track')
            .attr('x1', xScaleSlider.range()[0])
            .attr('x2', xScaleSlider.range()[1])
            .style('stroke-linecap', 'round')
            .style('stroke-width', '10px')
            .style('stroke', '#ededed');
            // .style('stroke', '#262626');
            // .style('stroke-opacity', 0.8);

        var trackInset = d3.select(slider.node().appendChild(track.node().cloneNode()))
            .attr('class', 'track-inset')
            .style('stroke-linecap', 'round')
            .style('stroke-width', '8px')
            .style('stroke', '#ededed');
            // .style('stroke', '#262626');

        var ticks = slider.append('g')
            .attr('class', 'ticks')
            .attr('transform', 'translate(0, 4)')
            .call(xAxisSlider);

        var handle = slider.append('circle')
            .classed('handle', true)
            .attr('r', 8)
            .style('fill', '#CD5C5C')
            .style('stroke', '#CD5C5C');

        var trackOverlay = d3.select(slider.node().appendChild(track.node().cloneNode()))
            .attr('class', 'track-overlay')
            .style('stroke', '#ccc')
            .style('stroke-width', '40px')
            .style('stroke-opacity', 0)
            .style('cursor', 'crosshair')
            .style('stroke-linecap', 'round')
            .call(drag);

        slider.transition()
            .duration(750)
            .tween('drag', function () {
                var i = d3.interpolate(0, range[1] / 5);
                return function (t) {
                    dragged(xScaleSlider(i(t)));
                }
            });

        function dragged(value) {
            var x = xScaleSlider.invert(value), index = null, midPoint, cx;
            if (step) {
                for (var i = 0; i < rangeValues.length - 1; i++) {
                    if (x >= rangeValues[i] && x <= rangeValues[i + 1]) {
                        index = i;
                        break;
                    }
                }
                midPoint = (rangeValues[index] + rangeValues[index + 1]) / 2;
                if (x < midPoint) {
                    cx = xScaleSlider(rangeValues[index]);
                    xVal = rangeValues[index];
                } else {
                    cx = xScaleSlider(rangeValues[index + 1]);
                    xVal = rangeValues[index + 1];
                }
            } else {
                cx = xScaleSlider(x);
                xVal = x.toFixed(3);
            }
            handle.attr('cx', cx);
            fun(args, xVal);
        }

        this.slider = slider;
        this.handle = handle;
        this.xScaleSlider = xScaleSlider;
    }
}