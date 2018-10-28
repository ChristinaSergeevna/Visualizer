module.exports = class Intersections {
    static intersectionLines(container, d1, d2) {
        var det = (d1.attr('x1') - d1.attr('x2')) * (d2.attr('y1') - d2.attr('y2')) - (d1.attr('y1') - d1.attr('y2')) * (d2.attr('x1') - d2.attr('x2'));
        var _d1 = d1.attr('x1') * d1.attr('y2') - d1.attr('y1') * d1.attr('x2'),
            _d2 = d2.attr('x1') * d2.attr('y2') - d2.attr('y1') * d2.attr('x2');
        var ix = (_d1 * (d2.attr('x1') - d2.attr('x2')) - _d2 * (d1.attr('x1') - d1.attr('x2'))) / det,
            iy = (_d1 * (d2.attr('y1') - d2.attr('y2')) - _d2 * (d1.attr('y1') - d1.attr('y2'))) / det;
        var isIntersection = !(d1.attr('x1') < ix ^ ix < d1.attr('x2')) && !(d2.attr('x1') < ix ^ ix < d2.attr('x2'));

        return { data: [ix, iy, 3], intersec: isIntersection };
    }

    static intersectionCircles(container, d1, d2) {
        var dx = +d2.attr('cx') - +d1.attr('cx'), dy = +d2.attr('cy') - +d1.attr('cy');
        var d = Math.sqrt((dy * dy) + (dx * dx));

        if (d > (+d1.attr('r') + +d2.attr('r')) || d < Math.abs(+d1.attr('r') - +d2.attr('r')))
            return false;

        var a = ((+d1.attr('r') * +d1.attr('r')) - (+d2.attr('r') * +d2.attr('r')) + (d * d)) / (2.0 * d);
        var x2 = +d1.attr('cx') + (dx * a / d),
            y2 = +d1.attr('cy') + (dy * a / d);
        var h = Math.sqrt((+d1.attr('r') * +d1.attr('r')) - (a * a));
        var rx = -dy * (h / d),
            ry = dx * (h / d);
        var xi = x2 + rx, xi_prime = x2 - rx,
            yi = y2 + ry, yi_prime = y2 - ry;

        return container.append('g').append('path')
            .attr('d', function() {
                return 'M' + xi + ',' + yi + 'A' + d2.attr('r') + ',' + d2.attr('r') +
                ' 0 0,1 ' + xi_prime + ',' + yi_prime + 'A' + d1.attr('r') + ',' + d1.attr('r') +
                ' 0 0,1 ' + xi + ',' + yi;
            })
            .style('fill-opacity', 0.7)
            .style('fill', 'IndianRed');
    }
}