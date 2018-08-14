var Figure = require('./Figures.js')

module.exports = class intersections {
    static intersectionLines(container, d1, d2) {
        var det = (d1.x1 - d1.x2) * (d2.y1 - d2.y2) - (d1.y1 - d1.y2) * (d2.x1 - d2.x2);
        var _d1 = d1.x1 * d1.y2 - d1.y1 * d1.x2,
            _d2 = d2.x1 * d2.y2 - d2.y1 * d2.x2;
        var ix = (_d1 * (d2.x1 - d2.x2) - _d2 * (d1.x1 - d1.x2)) / det,
            iy = (_d1 * (d2.y1 - d2.y2) - _d2 * (d1.y1 - d1.y2)) / det;
        var isIntersection = !(d1.x1 < ix ^ ix < d1.x2) && !(d2.x1 < ix ^ ix < d2.x2);
    
        Figure.pointsItems.push({ x: ix, y: iy, size: 3 });
        return Figure.intersectionPoint(container, pointsItems[5], { lwidth: 3, clrf: isIntersection ? '#8B0000' : 'black', clr: '#DC143C' });
    }
    
    static intersectionCircles(container, d1, d2) {
        var dx = d2.x - d1.x, dy = d2.y - d1.y;
        var d = Math.sqrt((dy * dy) + (dx * dx));
    
        if (d > (d1.size + d2.size) || d < Math.abs(d1.size - d2.size)) 
        {
            return false;
        }
    
        var a = ((d1.size * d1.size) - (d2.size * d2.size) + (d * d)) / (2.0 * d);
        var x2 = d1.x + (dx * a / d), 
            y2 = d1.y + (dy * a / d);
        var h = Math.sqrt((d1.size * d1.size) - (a * a));
        var rx = -dy * (h / d), 
            ry = dx * (h / d);
        var xi = x2 + rx, xi_prime = x2 - rx,
            yi = y2 + ry, yi_prime = y2 - ry;
    
        return container.append("g").append("path")
            .attr("d", function() {
                return "M" + xi + "," + yi + "A" + d2.size + "," + d2.size +
                " 0 0,1 " + xi_prime + "," + yi_prime+ "A" + d1.size + "," + d1.size +
                " 0 0,1 " + xi + "," + yi;
            })
            .style('fill-opacity', 0.5)
            .style('fill', 'IndianRed');
    }
}