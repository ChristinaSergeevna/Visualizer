<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
var Slider = require('./Slider.js')

=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
module.exports = class Grid {
    constructor(svg, view, width, height) {
        var gX = null, gY = null;
        var currentTransform = null;
        var range = [0, 5], step = 0,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            widthSlider = 80, xVal = 0;
=======
            widthSlider = 110, xVal = 0;
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
            widthSlider = 110, xVal = 0;
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
            widthSlider = 110, xVal = 0;
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

        var xScale = d3.scaleLinear()
            .domain([-width / 2, width / 2])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([-height / 2, height / 2])
            .range([0, height]);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
        
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
        
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
        
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        var xAxis = d3.axisTop(xScale)
            .ticks((width + 2) / (height + 2) * 10)
            .tickSize(-height);
        var yAxis = d3.axisLeft(yScale)
            .ticks(10)
            .tickSize(-width);

        var zoom = d3.zoom()
            .scaleExtent([0.5, 5])
            .translateExtent([[-width * 2, -height * 2], [width * 2, height * 2]])
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            .on("zoom", function() {
                currentTransform = d3.event.transform;
                view.attr("transform", currentTransform);
                gX.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
                gY.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
                // slider.transition()
                //     .duration(750)
                //     .tween("drag", function () {
                //         var i = d3.interpolate(handle.attr('cx'), d3.event.scale);
                //             return function (t) {

                //                 var x = xScaleSlider.invert(i(t));
                //                 handle.attr('cx', i(t));
                //             }
                //     });
            });

        // var slider = d3.select(".inset_content").append("p")
        //         .style('display', 'block')
        //         .style('position', 'absolute')
        //         .style('top', '250px')
        //         .style('left', '30px')
        //         .style('width', '80px') 
        //         .append("input")
        //             .datum({})
        //             .attr('id', 'slider')
        //             .attr('class', 'slider')  
        //             .attr("type", "range")
        //             .attr("value", 1)
        //             .attr("min", zoom.scaleExtent()[0])
        //             .attr("max", zoom.scaleExtent()[1])
        //             .attr("step", (zoom.scaleExtent()[1] - zoom.scaleExtent()[0]) / 100)
        //             // .attr("list", data)
        //             .on("input", function(d) {
        //                 zoom.scaleTo(svg, d3.select(this).property("value"));
        //             });

        var reset = d3.select(".inset_content").append("button")
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                .attr('class', 'button')
                .style('display', 'block')
                .style('position', 'absolute')
                .style('top', '40px')
                .style('left', '30px')
                .style('text', 'Reset')
                .style('width', '80px')
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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

=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                .on("click", function() {
                    slider.transition()
                        .duration(750)
                        .tween("drag", function () {
                            var i = d3.interpolate(handle.attr('cx'), 22);
                            return function (t) {
                                var x = xScaleSlider.invert(i(t));
                                handle.attr('cx', i(t));
                            }
                        });
                    svg.transition()
                        .duration(750)
                        .call(zoom.transform, d3.zoomIdentity);
                })
                .append('text')
                    .text('Reset');
    
        if (currentTransform) 
            view.attr('transform', currentTransform);

        gX = svg.append("g")
            .style('stroke-opacity', 0.4)
            .attr("fill", 'none')
            .attr("stroke-width", 1)
            .style('shape-rendering', 'crispEdges')
            .style('text-anchor', 'middle')
            .attr("class", "axis axis--x")
            .call(xAxis);
        gY = svg.append("g")
            .style('stroke-opacity', 0.4)
            .attr("fill", 'none')
            .attr("stroke-width", 1)
            .style('shape-rendering', 'crispEdges')
            .attr("class", "axis axis--y")
            .call(yAxis);

        // gX.selectAll('path').style("display", "none");
        // gY.selectAll('path').style("display", "none");
    
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        svg
            .call(zoom)
            .on('mousemove', function() {
                var xy = d3.mouse(this);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                var xy1 = [xScale.invert(xy[0]), yScale.invert(xy[1])];
=======
                var xy1 = [xScale.invert(xy[0]), yScale.invert(xy[1])];            
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
                var xy1 = [xScale.invert(xy[0]), yScale.invert(xy[1])];            
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
                var xy1 = [xScale.invert(xy[0]), yScale.invert(xy[1])];            
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                var transform = d3.zoomTransform(svg.node());
                var xy2 = transform.invert(xy1);
                d3.select('.coord').text(function() {
                        return Math.round(xy2[0]) + ', ' + Math.round(xy2[1]);
                    });
            })
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            .on('wheel.zoom', null)
            .on('dblclick.zoom', null);
    }
}
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            .on("wheel.zoom", null)
            .on('dblclick.zoom', null);

        var slider = svg.append('g')
            .classed('slider', true)
            .attr('transform', 'translate(' + (width - widthSlider - 5) +', '+ (height + 20) + ')');

        var xScaleSlider = d3.scaleLinear()
            .domain(range)
            .range([0, widthSlider])
            .clamp(true);
        var rangeValues = d3.range(range[0], range[1], step || 1).concat(range[1]);
        var xAxisSlider = d3.axisBottom(xScaleSlider)
            .tickValues(rangeValues)
            .tickFormat(function (d) {
                return d;
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
            .style('stroke', '#262626');
            // .style('stroke-opacity', 0.8);

        var trackInset = d3.select(slider.node().appendChild(track.node().cloneNode()))
            .attr('class', 'track-inset')
            .style('stroke-linecap', 'round')
            .style('stroke-width', '8px')
            .style('stroke', '#262626');

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

         // var text = svg.append('text')
         //    .attr('transform', 'translate(' + 0 + ', ' + 0 + ')')
         //    .text('Value: 0');

        slider.transition()
            .duration(750)
            .tween("drag", function () {
                var i = d3.interpolate(0, 1);
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
            // text.text('Value: ' + xVal);
            zoom.scaleTo(svg, xVal);
        }
    
        // view
        //     .on('mousemove', function() {
        //         var xy = d3.mouse(this);
        //         var transform = d3.zoomTransform(svg.node());
        //         var xy1 = transform.invert(xy);
        //         d3.select('.coord').text(function() {
        //                 return "Mouse:[" + xy[0] + ', ' + xy[1] + "] Zoomed:[" + xy1[0] + ', ' + xy1[1] + "]";
        //             });
                // d3.select('.coord')
                //     .text(function() {
                //         return "x = " + d3.event.pageX - document.getElementById('view').getBoundingClientRect().x + 10 + 
                //         ", y = " + Math.round(yScale.invert(d3.mouse(this)[1]));
                //     });
            // })
    }
<<<<<<< HEAD
<<<<<<< HEAD
}   
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
}   
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
}   
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
