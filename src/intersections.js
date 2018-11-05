module.exports = class Intersections {
    static intersectionLines(container, d1, d2) {
        var det = (d1.attr('x1') - d1.attr('x2')) * (d2.attr('y1') - d2.attr('y2')) - (d1.attr('y1') - d1.attr('y2')) * (d2.attr('x1') - d2.attr('x2'));
        var _d1 = d1.attr('x1') * d1.attr('y2') - d1.attr('y1') * d1.attr('x2'),
            _d2 = d2.attr('x1') * d2.attr('y2') - d2.attr('y1') * d2.attr('x2');
        var ix = (_d1 * (d2.attr('x1') - d2.attr('x2')) - _d2 * (d1.attr('x1') - d1.attr('x2'))) / det,
            iy = (_d1 * (d2.attr('y1') - d2.attr('y2')) - _d2 * (d1.attr('y1') - d1.attr('y2'))) / det;
        var isIntersection = !(d1.attr('x1') < ix ^ ix < d1.attr('x2')) && !(d2.attr('x1') < ix ^ ix < d2.attr('x2'));

        return { data: [ix, iy], intersec: isIntersection };
    }

    static intersectionCircles(container, d1, d2) {
        var dx = +d2.attr('cx') - +d1.attr('cx'), dy = +d2.attr('cy') - +d1.attr('cy');
        var d = Math.sqrt((dy * dy) + (dx * dx));

        if (d > (+d1.attr('r') + +d2.attr('r')))
            return false;
        if (d == (+d1.attr('r') + +d2.attr('r')))
            return [(+d1.attr('cx') + +d2.attr('cx')) / 2, (+d1.attr('cy') + +d2.attr('cy')) / 2];
        if (d < Math.abs(+d1.attr('r') - +d2.attr('r')))
            if (d1.attr('r') < d2.attr('r'))
                return ['M' + d1.attr('cx') + ',' + d1.attr('cy') + ' ' +
                    'm' + -d1.attr('r') + ', 0 ' +
                    'a' + d1.attr('r') + ',' + d1.attr('r') + ' 0 1,0 ' + d1.attr('r') * 2  + ',0 ' +
                    'a' + d1.attr('r') + ',' + d1.attr('r') + ' 0 1,0 ' + -d1.attr('r') * 2 + ',0Z',
                   Math.round(Math.PI * d1.attr('r') * d1.attr('r') * 1000) / 1000, [d1.attr('cx'), d1.attr('cy')]];
            else
                return ['M' + d2.attr('cx') + ',' + d2.attr('cy') + ' ' +
                    'm' + -d2.attr('r') + ', 0 ' +
                    'a' + d2.attr('r') + ',' + d2.attr('r') + ' 0 1,0 ' + d2.attr('r') * 2  + ',0 ' +
                    'a' + d2.attr('r') + ',' + d2.attr('r') + ' 0 1,0 ' + -d2.attr('r') * 2 + ',0Z',
                    Math.round(Math.PI * d2.attr('r') * d2.attr('r') * 1000) / 1000, [d2.attr('cx'), d2.attr('cy')]];

        var a = ((+d1.attr('r') * +d1.attr('r')) - (+d2.attr('r') * +d2.attr('r')) + (d * d)) / (2.0 * d);
        var x2 = +d1.attr('cx') + (dx * a / d),
            y2 = +d1.attr('cy') + (dy * a / d);
        var h = Math.sqrt((+d1.attr('r') * +d1.attr('r')) - (a * a));
        var rx = -dy * (h / d),
            ry = dx * (h / d);
        var xi = x2 + rx, xi_prime = x2 - rx,
            yi = y2 + ry, yi_prime = y2 - ry;

        var f1 = 2 * Math.acos((+d1.attr('r') * +d1.attr('r') - +d2.attr('r') * +d2.attr('r') + d * d) / (2 * d1.attr('r') * d));
        var f2 = 2 * Math.acos((+d2.attr('r') * +d2.attr('r') - +d1.attr('r') * +d1.attr('r') + d * d) / (2 * d2.attr('r') * d));
        var s1 = (d1.attr('r') * d1.attr('r') * (f1 - Math.sin(f1))) / 2;
        var s2 = (d2.attr('r') * d2.attr('r') * (f2 - Math.sin(f2))) / 2;

        return ['M' + xi + ',' + yi + 'A' + d2.attr('r') + ',' + d2.attr('r') +
               ' 0 0,1 ' + xi_prime + ',' + yi_prime + 'A' + d1.attr('r') + ',' + d1.attr('r') +
               ' 0 0,1 ' + xi + ',' + yi, Math.round((s1 + s2) * 1000) / 1000, [xi_prime, yi_prime]];
    }
}