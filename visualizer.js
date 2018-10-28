var svg = null, view = null, backdropContainer = null, 
    itemContainer = null, rulerContainer = null, angleContainer = null,
    draggedSvg = null, backdrop = null, selected = [];  

function init() {
    svg = d3.select("body").append('svg')
        .attr('width', '100%')
        .attr('height', '100vh')
        .attr('display', 'block');
    view = svg.append("g")
        .style('margin', 0)
        .style('font-family', 'sans-serif')
        .style('font-size', '12px')
        .attr("class", "view");
}
init();

var width = document.body.clientWidth,  
    height = document.body.clientHeight,
    gX = null, gY = null,
    currentTransform = null;

var xScale = d3.scaleLinear()
    .domain([-width / 2, width / 2])
    .range([0, width]);
var yScale = d3.scaleLinear()
    .domain([-height / 2, height / 2])
    .range([height, 0]);

var xAxis = d3.axisBottom(xScale)
    .ticks((width + 2) / (height + 2) * 10)
    .tickSize(height)
    .tickPadding(8 - height);
var yAxis = d3.axisRight(yScale)
    .ticks(10)
    .tickSize(width)
    .tickPadding(8 - width);

var zoom = d3.zoom()
    .scaleExtent([0.5, 5])
    .translateExtent([[-width * 2, -height * 2], [width * 2, height * 2]])
    .on("zoom", function() {
        currentTransform = d3.event.transform;
        view.attr("transform", currentTransform);
        gX.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
        gY.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
        slider.property("value", d3.event.scale);
    });

var slider = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '20px')
        .style('right', '20px')
        .append("input")
            .datum({})
            .attr("type", "range")
            .attr("value", 1)
            .attr("min", zoom.scaleExtent()[0])
            .attr("max", zoom.scaleExtent()[1])
            .attr("step", (zoom.scaleExtent()[1] - zoom.scaleExtent()[0]) / 100)
            .on("input", function(d) {
                zoom.scaleTo(svg, d3.select(this).property("value"));
            });

var reset = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '20px')
        .style('left', '45px')
        .append("input")
            .datum({})
            .attr("type", "button")
            .attr('value', 'Reset')
            .style('width', '80px')
            .on("click", function() {
                svg.transition()
                .duration(750)
                .call(zoom.transform, d3.zoomIdentity);
                slider.property("value", 1);
            });

var addFigure = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '50px')
        .style('left', '45px')
        .append("input")
            .datum({})
            .attr("type", "button")
            .attr('value', 'Add')
            .style('width', '80px')
            //.on("click", added);

var deleteFigure = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '80px')
        .style('left', '45px')
        .append("input")
            .datum({})
            .attr("type", "button")
            .attr('value', 'Delete')
            .style('width', '80px')
            //.on("click", added);

var zoomInItem = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '140px')
        .style('left', '70px')
        .append("input")
            .datum({})
            .attr("type", "button")
            .attr('value', '+')
            .style('width', '30px')
            .on("click", function() {
                for (var i = 0; i < selected.length; i++) {
                    if (selected[i]) {
                        var el = d3.select(selected[i]);
                        var w = +el.attr('width'), h = +el.attr('height');
                        var x = +el.attr('x'), y = +el.attr('y');
                        el.attr('width', w + 10); el.attr('height', h + 10);
                        el.attr('x', x - 5); el.attr('y', y - 5);
                    }
                }
            });

var zoomOutItem = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '170px')
        .style('left', '70px')
        .append("input")
            .datum({})
            .attr("type", "button")
            .attr('value', '-')
            .style('width', '30px')
            .on("click", function() {
                for (var i = 0; i < selected.length; i++) {
                    if (selected[i]) {
                        var el = d3.select(selected[i]);
                        var w = +el.attr('width'), h = +el.attr('height');
                        var x = +el.attr('x'), y = +el.attr('y');
                        el.attr('width', w - 10); el.attr('height', h - 10);
                        el.attr('x', x + 5); el.attr('y', y + 5);
                    }
                }
            });

/***************************************** ruler *********************************************/

var ruler = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '110px')
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
                });

function clearDrawing() {
    if (draggedSvg) 
        draggedSvg.remove();
    draggedSvg = null;
    if (svg) {
        // backdrop.remove();
        backdrop = null;
        rulerContainer.remove();
        rulerContainer = null;
        itemContainer.remove();
        itemContainer = null;
        pointsRuler = [{}]; 
        pointsItems = [{}]; 
        // svg.on('mousedown', null);
        view.exit().remove();
        svg.remove();
        svg = null;
    }
}

function newItem(x, y) {
    clearDrawing();
    init();
    pointsRuler.push({ x: x, y: y });
    draw();
}

var dragline = null, dragdot2 = null;
var text = null;

var dragme = d3.drag()
        .on("start", function(d) {
            var thisdragY = d3.select(this).attr("cy");
            var thisdragX = d3.select(this).attr("cx");
            var thisdragR = +d3.select(this).attr("r");
            rulerContainer.append("circle") 
                .attr('class', 'ruler2')
                .attr("cx", thisdragX)
                .attr("cy", thisdragY)
                .attr("r", thisdragR / 6)
                .style('fill-opacity', 0.5)
                .attr("fill", "black");
            dragdot2 = rulerContainer.append("circle") 
                    .attr('class', 'ruler2')
                    .attr("cx", thisdragX)
                    .attr("cy", thisdragY)
                    .attr("r", thisdragR)
                    .style('fill-opacity', 0.0);
            dragline = rulerContainer.append("line")
                    .attr("x1", thisdragX)
                    .attr("x2", thisdragX)
                    .attr("y1", thisdragY)
                    .attr("y2", thisdragY)
                    .style("stroke", "black")
                    .style("stroke-width", "1");
        })
        .on("drag", function() {
            var coord = d3.mouse(this); 
            var xx = coord[0], yy = coord[1];
            dragline.attr("x2", xx).attr("y2", yy);
            d3.selectAll(".ruler2").attr("cx", xx).attr("cy", yy).attr('fill', 'blue');
        })
        .on("end", function(d) {
            dragdot2.call(d3.drag()
                .on("drag", function() {
                    var coord = d3.mouse(this); 
                    var xx = coord[0], yy = coord[1];
                    dragline.attr("x2", xx).attr("y2", yy);
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
                    dragline.attr("x1", xx).attr("y1", yy);
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
                .attr("y", (dragline.attr("y1") < dragline.attr("y2") ? dragline.attr("y2") - 30 : dragline.attr("y2") + 30))
                .attr("x", (dragline.attr("x1") < dragline.attr("x2") ? dragline.attr("x2") - 30 : dragline.attr("x2") + 30))
                .attr('text-anchor', 'middle')
                .text(Math.round(dragline.node().getTotalLength() * 1000) / 1000);
        });

///////////////////////////////////////////////////////////////////////////////////

var pointsRuler = [{}]; 
var pointsItems = [{}];  

function drawGrid() {
    if (currentTransform) 
        view.attr('transform', currentTransform);
    
    gX = svg.append("g")
        .style('stroke-opacity', 0.3)
        .style('shape-rendering', 'crispEdges')
        .style('text-anchor', 'middle')
        .attr("class", "axis axis--x")
        .call(xAxis);
    gY = svg.append("g")
        .style('stroke-opacity', 0.3)
        .style('shape-rendering', 'crispEdges')
        .style('text-anchor', 'middle')
        .attr("class", "axis axis--y")
        .call(yAxis);

    gX.selectAll('path').style("display", "none");
    gY.selectAll('path').style("display", "none");

    svg.call(zoom)
        .on("wheel.zoom", null)
        .on('dblclick.zoom', null);
}

function draw() {
    drawGrid();
    initItemContainer();
    initRulerContainer();
}
draw();

/*************************************** figures ***************************************/

function animatedCircle(circle) {
    circle
        .transition()
        .duration(3000)
        .delay(2000);

    circle    
        .on("click", function() {
            d3.select(this)
                .transition()
                .duration(3000)
                .attr("cx", Math.random() * 700)
                .attr("cy", Math.random() * 300)
                .style("fill", d3.rgb( Math.random() * 255, Math.random() * 255, Math.random() * 255 ))
                .attr("r", Math.random() * 100);
        });
}

function addCircle(container, cx, cy, r, lwidth = 2.5, clr = 'black', clrf = 'none') {   
    var drag = d3.drag()
        .on('drag', function() {
            container.select(this)
                .attr('cx', d3.event.x)
                .attr('cy', d3.event.y);
        })

    var resize = d3.drag()
        .on('drag', function() {
            container.select('.resizingContainer')
                .attr('r', function(c) {
                    return Math.pow(Math.pow(this.attributes.cx.value - d3.event.x, 2) + Math.pow(this.attributes.cy.value - d3.event.y, 2), 0.5);
                });
            container.selectAll('.draggableCircle')
                .attr('r', function(c) {
                    return Math.pow(Math.pow(this.attributes.cx.value - d3.event.x, 2) + Math.pow(this.attributes.cy.value - d3.event.y, 2), 0.5) - 6;
                });
        })

    container.append('circle')
        .style('stroke', clr)
        .style('stroke-width', lwidth) 
        .style('fill-opacity', 0.5)
        .style('cursor', 'nesw-resize')
        .attr('fill', clrf)
        .attr('class', 'resizingContainer')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', r)
        .call(resize);

    return container.append('circle')
        .style('stroke', 'none')
        .style('stroke-width', lwidth) 
        .style('fill-opacity', 0.5)
        .attr('fill', 'none')
        .attr('class', 'draggableCircle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', r - 6)
        .call(drag);
}

function addLine(container, x1, y1, x2, y2, lwidth = 2.5, clr = 'black') {       
    container.append('line')
        .style('stroke', clr)
        .style('stroke-width', lwidth)
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2);
}

function addSquare(container, x, y, len, lwidth = 2.5, clr = 'black', clrf = 'none') {   
    var item = container.append('rect')
        .style('stroke', clr)
        .style('stroke-width', lwidth)
        .attr('fill', clrf)
        .attr('class', 'draggableSquare')
        .attr('x', x)
        .attr('y', y)
        .attr('width', len) 
        .attr('height', len)
        .attr('data-rotation', 0)
        .attr('rx', 0)
        .on('click', function(d) { 
            for (var i = 0; i < selected.length; i++) {
               if (selected[i] == this) {
                    var el = d3.select(this);
                    selected.splice(i, 1);
                    el.style('stroke-width', lwidth);
                    el.style('stroke', clr);
                    return;
                }
            }
            selected.push(this);
            var el = d3.select(this);
            el.style('stroke-width', 2);
            el.style('stroke', 'black');
        });
}

function addArc(container, cx, cy, r1, r2, lwidth = 2.5, clr = 'black', clrf = 'none') {   
    var arc = d3.arc()
        .innerRadius(r1)
        .outerRadius(r2)
        .startAngle(45 * (Math.PI / 180))
        .endAngle(10);
    
    return container.append("g").append("path")
        .style('stroke', clr)
        .style('stroke-width', lwidth)
        .style('fill-opacity', 0.5)
        .attr('fill', clrf)
        .attr('d', arc)
        .attr('transform', "translate(" + cx + "," + cy +")");
}

/*************************************** intersections ***************************************/

function intersectionLines(ax, ay, bx, by, cx, cy, dx, dy) {
    var det = (ax - bx) * (cy - dy) - (ay - by) * (cx - dx);
    var d1 = ax * by - ay * bx,
        d2 = cx * dy - cy * dx;
    var ix = (d1 * (cx - dx) - d2 * (ax - bx)) / det,
        iy = (d1 * (cy - dy) - d2 * (ay - by)) / det;
    var isIntersection = !(ax < ix ^ ix < bx) && !(cx < ix ^ ix < dx);

    text = itemContainer.append("text")
        .attr("y", iy - 20)
        .attr("x", ix)
        .attr('text-anchor', 'middle')
        .text('x: ' + ix + '; y: ' + iy);

    return {x: ix, y: iy, inter: isIntersection};
}

function intersectionCircles(x0, y0, r0, x1, y1, r1) {
    var dx = x1 - x0, dy = y1 - y0;
    var d = Math.sqrt((dy * dy) + (dx * dx));

    if (d > (r0 + r1) || d < Math.abs(r0 - r1)) 
    {
      return false;
    }

    var a = ((r0 * r0) - (r1 * r1) + (d * d)) / (2.0 * d);
    var x2 = x0 + (dx * a / d), 
        y2 = y0 + (dy * a / d);
    var h = Math.sqrt((r0 * r0) - (a * a));
    var rx = -dy * (h / d), 
        ry = dx * (h / d);
    var xi = x2 + rx, xi_prime = x2 - rx,
        yi = y2 + ry, yi_prime = y2 - ry;

    return [xi, xi_prime, yi, yi_prime];
}

/*************************************** init containers ***************************************/
function initItemContainer() {
    itemContainer = view.selectAll("g")
            .attr("class", "itemContainer")
            .data(pointsItems).enter().append('g')
            .attr("transform", () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');

    pointsItems.push({ cx1: 100, cy1: 100, size: 100 });
    addCircle(itemContainer, 100, 100, 100, 3, 'LightBlue', 'LightCyan');
    addSquare(itemContainer, 100, 100, 100, 3.5, 'none', 'Red'); 
    pointsItems.push({ x0: -350, y0: 150, x1: 0, y1: 150 });
    pointsItems.push({ x10: -350, y10: 100, x11: 0, y11: 200 });
    addLine(itemContainer, -350, 150, 0, 150, 2.5, 'orange'); 
    addLine(itemContainer, -350, 100, 0, 200, 2.5, 'orange'); 
    // addArc(itemContainer, 200, 200, 50, 80, 2.5, 'black');
    
    var interPoint = intersectionLines(-350, 150, 0, 150, -350, 100, 0, 200);

    pointsItems.push({ x: interPoint.x, y: interPoint.y });

    itemContainer.append('circle')
        .attr('fill', interPoint.inter ? 'red' : 'black')
        .attr('cx', interPoint.x)
        .attr('cy', interPoint.y)
        .attr('r', 5);

    var circle = itemContainer.append('circle')
        .attr('fill', 'black')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 50);

    animatedCircle(circle);
    
    // var x1 = -150, y1 = -100, x2 = -50, y2 = -100, r1 = 100, r2 = 100;
    
    // itemContainer.append('circle')
    //     .style('stroke', "black")
    //     .style('stroke-width', 3) 
    //     .style('fill-opacity', 0.5)
    //     .attr('fill', 'none')
    //     .attr('cx', x1)
    //     .attr('cy', y1)
    //     .attr('r', r1);
    // itemContainer.append('circle')
    //     .style('stroke', "black")
    //     .style('stroke-width', 3) 
    //     .style('fill-opacity', 0.5)
    //     .attr('fill', 'none')
    //     .attr('cx', x2)
    //     .attr('cy', y2)
    //     .attr('r', r2);
    
    // var interPoints = intersectionCircles(x1, y1, r1, x2, y2, r2); 
    
    // itemContainer.append("g").append("path")
    //     .attr("d", function() {
    //         return "M" + interPoints[0] + "," + interPoints[2] + "A" + r2 + "," + r2 +
    //         " 0 0,1 " + interPoints[1] + "," + interPoints[3]+ "A" + r1 + "," + r1 +
    //         " 0 0,1 " + interPoints[0] + "," + interPoints[2];
    //     })
    //     .style('stroke-width', 3) 
    //     .style('stroke', 'red')
    //     .style('fill-opacity', 0.5)
    //     .style('fill', 'IndianRed');
}

function initRulerContainer() {
    backdropContainer = view.append('g')
        .attr('transform', function() {
            return 'translate(' + xScale(0) + ',' + yScale(0) + ')';
        });

    backdrop = backdropContainer
        .lower()
        .append('rect')
        .attr('class', 'table-backdrop')
        .attr('x', -width * 2)
        .attr('y', -height * 2)
        .attr('height', height * 3)
        .attr('width', width * 3)
        .attr('opacity', '0');

        backdrop.on('mousedown', function() {
            var mouse = d3.mouse(this);
            if (draggedSvg && svg) {
                var x = mouse[0];
                var y = mouse[1];
                newItem(x, y);
            }
        });

    rulerContainer = view.selectAll(".table-backdrop")
        .attr("class", "rulerContainer")
        .data(pointsRuler).enter().append('g')
        .attr("transform", () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');

    rulerContainer.append('circle')
        .attr('class', 'ruler')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 5)
        .style('fill-opacity', 0.5)
        .attr('fill', 'black');

    var item = rulerContainer.append('circle')
        .attr('class', 'ruler')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 30)
        .style('fill-opacity', 0.0)
        .call(dragme); 
}

/*************************************** init angle ***************************************/

function initAngle() {
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
                .attr("transform", "translate(" + 200 + "," + 150 + ")");
    
    var drag = d3.drag().on("drag", function(d) { 
        d.x = d3.event.x; 
        d.y = d3.event.y; 
        update(); 
    });

    var arc = d3.arc();
    var format = d3.format(".2f")
    
    var differenceArc = angleContainer.append("g").datum({});
    var differencePath = differenceArc.append("path")
        .attr("class", "difference");                        
    var differenceText = differenceArc.append("text");
    
    var sourceVector = angleContainer.append("g")
        .attr("class", "source")
        .datum({x: 0, y: -200});
    var sourceHandle = sourceVector.append("g")
        .attr("class", "handle")
        .call(drag);
    var sourceLine = sourceVector.append("line")
        .style('stroke', 'black')
        .attr("marker-end", "url(#arrowhead)");
    sourceHandle.append("circle")
        .style('fill-opacity', 0.0)
        .attr('fill', 'white')
        .attr("r", 20);
    var sourceText = sourceHandle.append("text")
        .attr("dy", -15);
    
    var compareVector = angleContainer.append("g")
        .attr("class", "compare")
        .datum({x: 200, y: 0});
    var compareHandle = compareVector.append("g")
        .attr("class", "handle")
        .call(drag);
    var compareLine = compareVector.append("line")
        .style('stroke', 'black')
        .attr("marker-end", "url(#arrowhead)");
    compareHandle.append("circle")
        .style('fill-opacity', 0.0)
        .attr('fill', 'white')
        .attr("r", 20);
    var compareText = compareHandle.append("text")
          .attr("dy", -15);
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
update();