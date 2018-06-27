// module.exports = class Angle {
    
    var angleContainer = null, arc = d3.arc(),
        sourceVector = null, compareVector = null,
        sourceHandle = null, compareHandle = null, 
        sourceLine = null, compareLine = null, 
        differenceText = null, differencePath = null;
    
    function initAngle(data) {
        svg.append("svg:defs")
                .append("svg:marker")
                    .attr("id", "arrowhead")
                    .attr("viewBox", "0 0 10 10")
                    .attr("refX", 5)
                    .attr("refY", 5)
                    .attr("markerUnits", "strokeWidth")
                    .attr("markerWidth", 8)
                    .attr("markerHeight", 8)
                    .attr("orient", "auto")
                    .append("svg:path")
                        .attr("d", "M 0 0 L 10 5 L 0 10 z");
        
        angleContainer = view.selectAll("g")
                .attr("class", "angleContainer")
                .append("g")
                    .attr("transform", "translate(" + data.cx + "," + data.cy + ")");
        
        var drag = d3.drag()
            .on("drag", function(d) { 
                d.x = d3.event.x; 
                d.y = d3.event.y; 
                update(); 
            });
    
        var format = d3.format(".2f")
        
        var differenceArc = angleContainer.append("g").datum({});
        differencePath = differenceArc.append("path")
            .attr("class", "difference");                        
        differenceText = differenceArc.append("text");
        
        sourceVector = angleContainer.append("g")
            .attr("class", "source")
            .datum({x: data.x1, y: data.y1});
        sourceHandle = sourceVector.append("g")
            .attr("class", "handle")
            .call(drag);
        sourceLine = sourceVector.append("line")
            .style('stroke', 'black')
            .attr("marker-end", "url(#arrowhead)");
        sourceHandle.append("circle")
            .style('fill-opacity', 0.0)
            .attr('fill', 'white')
            .attr("r", 20);
        var sourceText = sourceHandle.append("text")
            .attr("dy", -15);
        
        compareVector = angleContainer.append("g")
            .attr("class", "compare")
            .datum({x: data.x2, y: data.y2});
        compareHandle = compareVector.append("g")
            .attr("class", "handle")
            .call(drag);
        compareLine = compareVector.append("line")
            .style('stroke', 'black')
            .attr("marker-end", "url(#arrowhead)");
        compareHandle.append("circle")
            .style('fill-opacity', 0.0)
            .attr('fill', 'white')
            .attr("r", 20);
        var compareText = compareHandle.append("text")
            .attr("dy", -15);
        update();
    }

    function update() {
        var source = sourceVector.datum(),
            compare = compareVector.datum();
    
        var sourceLength = Math.sqrt(source.x * source.x + source.y * source.y),
            compareLength = Math.sqrt(compare.x * compare.x + compare.y * compare.y);
    
        var a1 = Math.atan2(compare.y, compare.x),
            a2 = Math.atan2(source.y, source.x);
    
        var sign = a1 > a2 ? 1 : -1;
        var angle = a1 - a2;
        var K = -sign * Math.PI * 2;
        angle = (Math.abs(K + angle) < Math.abs(angle)) ? K + angle : angle;
    
        sourceLine
            .attr("x2", (d) => d.x)
            .attr("y2", (d) => d.y);
    
        sourceHandle
            .attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    
        compareLine
            .attr("x2", (d) => d.x)
            .attr("y2", (d) => d.y);
    
        compareHandle.attr("transform", (d) => `translate(${d.x}, ${d.y})`)
    
        arc
            .innerRadius(0)
            .outerRadius(Math.max(30, Math.min(sourceLength, compareLength) * 0.9))
            .startAngle(a2 + Math.PI / 2)
            .endAngle(a2 + angle + Math.PI / 2);
        differencePath
            .style("fill", angle > 0 ? "SkyBlue" : "PeachPuff")
            .style("fill-opacity", 0.4)
            .attr("d", arc());
        differenceText
            .attr("transform", "translate(" + arc.centroid() + ")")
            .text(Math.abs(Math.round(360 * angle / (Math.PI * 2))) + "º")
    }
    
// }