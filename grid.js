var svg = null, view = null;

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

function buttonStyle(button) {
    button
        .style('border', 'none')
            .style('color', 'white')
            .style('background', '#CD5C5C')
            .style('height', '25px')
            .style('cursor', 'pointer')
            .style('padding-right', '26px')
            .style('border-radius', '3px')
            .style('margin', 0)
            .style('padding', '0 12px')
            .on("mouseover", function() {
                var button = d3.select(this);
                button.style('background-color', '#696969');
            })
            .on("mouseleave", function() {
                d3.select(this).style('background-color', '#CD5C5C');
            });
}

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

buttonStyle(reset);