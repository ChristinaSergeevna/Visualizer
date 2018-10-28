(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
<<<<<<< HEAD
<<<<<<< HEAD
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
=======
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
<<<<<<< HEAD
<<<<<<< HEAD
/***/ (function(module, exports, __webpack_require__) {

var Slider = __webpack_require__(1)
=======
/***/ (function(module, exports) {
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
/***/ (function(module, exports) {
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

module.exports = class Grid {
    constructor(svg, view, width, height) {
        var gX = null, gY = null;
        var currentTransform = null;
        var range = [0, 5], step = 0,
<<<<<<< HEAD
<<<<<<< HEAD
            widthSlider = 80, xVal = 0;
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
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        svg
            .call(zoom)
            .on('mousemove', function() {
                var xy = d3.mouse(this);
<<<<<<< HEAD
<<<<<<< HEAD
                var xy1 = [xScale.invert(xy[0]), yScale.invert(xy[1])];
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
            .on('wheel.zoom', null)
            .on('dblclick.zoom', null);
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = class Slider {
    constructor(top, left, range, cl, fun, args) {
        var step = 0,
            widthSlider = 70, xVal = 0;

        var slider = d3.select('.inset_content').append('svg')
            .attr('width', widthSlider + 50)
            .attr('height', 50)
            .attr('transform', 'translate(' + left +', '+ top + ')')
                .append('g')
                    .classed('slider', true)
                    .attr('transform', 'translate(' + (35) +', '+ (10) + ')');

        var tf = ['slower', 'faster'];
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            .on("wheel.zoom", null)
            .on('dblclick.zoom', null);

        var slider = svg.append('g')
            .classed('slider', true)
            .attr('transform', 'translate(' + (width - widthSlider - 5) +', '+ (height + 20) + ')');
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

        var xScaleSlider = d3.scaleLinear()
            .domain(range)
            .range([0, widthSlider])
            .clamp(true);
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        var rangeValues = d3.range(range[0], range[1], step || 1).concat(range[1]);
        var xAxisSlider = d3.axisBottom(xScaleSlider)
            .tickValues(rangeValues)
            .tickFormat(function (d) {
                return d;
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
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
<<<<<<< HEAD
<<<<<<< HEAD
            .style('stroke', '#ededed');
            // .style('stroke', '#262626');
=======
            .style('stroke', '#262626');
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
            .style('stroke', '#262626');
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            // .style('stroke-opacity', 0.8);

        var trackInset = d3.select(slider.node().appendChild(track.node().cloneNode()))
            .attr('class', 'track-inset')
            .style('stroke-linecap', 'round')
            .style('stroke-width', '8px')
<<<<<<< HEAD
<<<<<<< HEAD
            .style('stroke', '#ededed');
            // .style('stroke', '#262626');
=======
            .style('stroke', '#262626');
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
            .style('stroke', '#262626');
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

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

<<<<<<< HEAD
<<<<<<< HEAD
        slider.transition()
            .duration(750)
            .tween('drag', function () {
                var i = d3.interpolate(0, range[1] / 5);
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
         // var text = svg.append('text')
         //    .attr('transform', 'translate(' + 0 + ', ' + 0 + ')')
         //    .text('Value: 0');

        slider.transition()
            .duration(750)
            .tween("drag", function () {
                var i = d3.interpolate(0, 1);
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
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
<<<<<<< HEAD
<<<<<<< HEAD
            fun(args, xVal);
        }

        this.slider = slider;
        this.handle = handle;
        this.xScaleSlider = xScaleSlider;
    }
}

/***/ }),
/* 2 */
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
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
}   

/***/ }),
/* 1 */
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
<<<<<<< HEAD
<<<<<<< HEAD
var Panel = __webpack_require__(3)
var Grid = __webpack_require__(0)
var Ruler = __webpack_require__(4)
var Figures = __webpack_require__(5)
var Anim = __webpack_require__(8)
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
var Panel = __webpack_require__(2)
var Grid = __webpack_require__(0)
var Ruler = __webpack_require__(3)
var Figures = __webpack_require__(4)
var Anim = __webpack_require__(7)
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

class Visualizer {
    static SVG(data) {
        var margin = {top: 40, right: 40, bottom: 50, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

<<<<<<< HEAD
<<<<<<< HEAD
        var div = d3.select('body').append('div')
=======
        var div = d3.select("body").append('div')
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
        var div = d3.select("body").append('div')
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                .attr('class', 'block')
                .style('position', 'absolute')
                .style('top', '30px')
                .style('left', '50px')
<<<<<<< HEAD
<<<<<<< HEAD
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .style('background-color', '#eee');

        var svg = d3.select('.block').append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .attr('display', 'block')
                .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .style('background-color', '#eee');

        var svg = d3.select(".block").append('svg')
                // .attr('width', '70%')
                // .attr('height', '70vh')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr('display', 'block')
                .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

        var coord = svg.append('text')
                .attr('class', 'coord')
                .attr('x', width / 2)
                .attr('y', height + (margin.bottom / 2))
                .attr('text-anchor', 'middle')
                .text('0, 0');

<<<<<<< HEAD
<<<<<<< HEAD
=======
        // var width = document.body.clientWidth;
        // var height = document.body.clientHeight;

>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
        // var width = document.body.clientWidth;
        // var height = document.body.clientHeight;

>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        this.canvas(svg, margin, width, height, data);
    }

    static canvas(svg, margin, width, height, data) {
<<<<<<< HEAD
<<<<<<< HEAD
        var view = svg.append('svg')
            .attr('id', 'view')
            .attr('width', width)
            .attr('height', height)
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        var view = svg.append("svg")
            .attr('id', 'view')
            .attr("width", width)
            .attr("height", height)
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            .attr('left', margin.left)
            .attr('top', margin.top)
            .append('g')
                // .style('font-family', 'sans-serif')
                .style('font-size', '12px')
<<<<<<< HEAD
<<<<<<< HEAD
                .attr('class', 'view');
=======
                .attr("class", "view");
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
                .attr("class", "view");
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

        Panel.create();

        var grid = new Grid(svg, view, width, height);
        var items = new Figures(view, grid, data, width, height);
        var anim = new Anim(items);
        var ruler = new Ruler(view, grid, width, height);

<<<<<<< HEAD
<<<<<<< HEAD
        d3.selectAll('.button')
            .style('border', 'none')
            .style('outline-style', 'none')
            .style('color', '#ededed')
=======
        d3.selectAll(".button")
            .style('border', 'none')
            .style('color', 'white')
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
        d3.selectAll(".button")
            .style('border', 'none')
            .style('color', 'white')
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            .style('background', '#CD5C5C')
            .style('height', '25px')
            .style('cursor', 'pointer')
            .style('padding-right', '26px')
            .style('border-radius', '3px')
            .style('margin', 0)
            .style('padding', '0 12px')
<<<<<<< HEAD
<<<<<<< HEAD
            .on('mouseover', function() {
                var button = d3.select(this);
                button.style('background-color', '#696969');
            })
            .on('mouseleave', function() {
                d3.select(this).style('background-color', '#CD5C5C');
            });
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            .on("mouseover", function() {
                var button = d3.select(this);
                button.style('background-color', '#696969');
            })
            .on("mouseleave", function() {
                d3.select(this).style('background-color', '#CD5C5C');
            }); 
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    }
}
/* harmony export (immutable) */ __webpack_exports__["Visualizer"] = Visualizer;


/***/ }),
<<<<<<< HEAD
<<<<<<< HEAD
/* 3 */
=======
/* 2 */
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
/* 2 */
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
/***/ (function(module, exports) {

module.exports = class Panel {
    constructor() {
        this._open_panel = 0;
        this.open_panel = 0;
        this.open_begin = 0;
        this.set_motor = false;
        this.delta_x = 10;
        this.time_pause_motor = 1;
    }

    static create() {
        var panel = new Panel();

        var block_inset = d3.select('.block').append('div')
            .attr('class', 'block_inset')
            .attr('id', 'block_inset')
<<<<<<< HEAD
<<<<<<< HEAD
            .style('display', 'none')
            .style('position', 'absolute')
            .style('top', '0px')
            .style('bottom', '0px')
            .style('left', '0px')
            .style('width', '150px')
            .style('height', '100%')
            .style('overflow-x', 'hidden');

        d3.select('.block').append('button')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '455px')
            .style('left', '0px')
            .style('width', '45px')
            .style('border', 'none')
            .style('outline-style', 'none')
            .style('color', '#CD5C5C')
            .style('background', '#eee')
            .style('height', '45px')
            .style('cursor', 'pointer')
            .style('padding-right', '26px')
            .style('border-radius', '3px')
            .style('margin', 0)
            .style('padding', '0 12px')
            .on('mouseover', function() {
                d3.select(this).style('background-color', '#696969');
            })
            .on('mouseleave', function() {
                d3.select(this).style('background-color', '#eee');
            })
            .on('click', function() {
                document.getElementById('div').style.transition = 'all 0.5s linear';
                document.getElementById('block_inset').style.display = 'block';
                setTimeout('document.getElementById("div").style.transform = "translateX(150px)";', 200);
            })
            .append('text')
                .style('font-size', '25px')
                .text('☰');

        d3.select('svg').on('click', function() {
            document.getElementById('div').style.transform = 'translateX(0px)';
            setTimeout('document.getElementById("block_inset").style.display = "none"', 500);
        });

        var inset_num = d3.select('.block_inset').append('div')
            .attr('class', 'inset_num')
            .attr('id', 'div')
            .style('position', 'absolute')
            .style('top', '0px')
            .style('bottom', '0px')
            .style('width', '150px')
            .style('height', '100%')
            .style('left', '-150px')
            .style('z-index', 3);

=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            .style('position', 'absolute')
            .style('top', '0px')
            .style('bottom', '0px') 
            .style('left', '0px')
            .style('width', '190px') 
            .style('height', '100%')
            .style('overflow-x', 'hidden');

        var reltr = d3.select('.block').append('div')
            .attr('class', 'reltr')
            .attr('id', 'reltr')
            .style('z-index', 2)
            .style('left', '0px')   
            .style('width', '40px')
            .style('height', '100%') 
            .style('position', 'absolute')
            .style('background-color', 'rgba(0, 0, 0, 0.0)') 
            // .style('background', '#b5b5b5')
            .style('top', 0)
            .on('mouseover', function() {
                document.getElementById('div').style.transition = "all 0.5s linear";
                document.getElementById('reltr').style.transition = "all 0.5s linear";
                if (!panel.open_panel) {
                    document.getElementById('block_inset').style.display = 'block';
                    setTimeout("document.getElementById('div').style.transform = 'translateX(150px)';document.getElementById('reltr').style.transform = 'translateX(150px)'", 200);
                    panel.open_panel = true;
                }
                else {
                    document.getElementById('div').style.transform = "translateX(0px)";
                    document.getElementById('reltr').style.transform = "translateX(0px)";
                    setTimeout("document.getElementById('block_inset').style.display = 'none'", 500);
                    panel.open_panel = false;
                }
                // if (!panel.set_motor) { 
                //     panel.set_motor = true;
                //     if (panel.open_panel == 0) { 
                //         panel._open_panel = 1;
                //         panel.open_begin = 1;
                //     }
                //     else { 
                //         panel._open_panel = panel.open_panel;
                //         panel.open_begin = -1;
                //     }
                //     panel.motor_inset();   
                // }
            });
    
        var inset_num = d3.select('.block_inset').append('div') 
            .attr('class', 'inset_num')
            .attr('id', 'div')
            .style('position', 'absolute') 
            .style('top', '0px')
            .style('bottom', '0px') 
            .style('width', '150px') 
            .style('height', '100%')
            .style('left', '-150px')
            .style('z-index', 3); 
    
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        var inset_content = d3.select('.inset_num').append('div')
            .attr('class', 'inset_content')
            .style('position', 'relative')
            .style('margin', '0px')
            .style('padding', '0px')
<<<<<<< HEAD
<<<<<<< HEAD
            .style('width', '100%')
            .style('height', '100%')
            .style('color', '#fff')
            .style('background-color', 'rgba(0, 0, 0, 0.8)')
            .style('overflow-y', 'auto');
    }
}

/***/ }),
/* 4 */
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            .style('width', '100%') 
            .style('height', '100%')
            .style('color', '#fff')   
            .style('background-color', 'rgba(0, 0, 0, 0.8)') 
            .style('overflow-y', 'auto');
    }
    
    // click_header_inset() {
    //     if (!this.set_motor) {
    //         this.set_motor = true;
    //         if (this.open_panel == 0) { 
    //             this._open_panel = 1;
    //             this.open_begin = 1;
    //         }
    //         else { 
    //             this._open_panel = open_panel;
    //             this.open_begin = -1;
    //         }
    //         this.motor_inset();
    //     }
    // }
    
    // motor_inset() {
    //     if (this._open_panel == 0) return;
    //     if (this.open_begin == 0) return; 
    //     var obj_inset = d3.select('.inset_num');
    //     var x_inset_motor = +obj_inset.style('left').slice(0, -2);
    //     x_inset_motor += this.open_begin * this.delta_x;
        
    //     if (this.open_begin > 0) { 
    //         if (x_inset_motor > 0) {
    //             x_inset_motor = 0;
    //             this.set_motor = false;
    //             this.open_panel = this._open_panel;  
    //         }
    //     }
    //     else { // панель скрывается
    //         if (x_inset_motor <= -obj_inset.style('width').slice(0, -2)) {
    //             x_inset_motor = -obj_inset.style('width').slice(0, -2);
    //             this.set_motor = false;
    //             this.open_panel = 0;  
    //         }
    //     }
    //     obj_inset.style('left', x_inset_motor + "px");
    //     d3.select('.reltr').style('left', x_inset_motor + +obj_inset.style('width').slice(0, -2) + "px");  
    //     if (this.set_motor) {
    //         var id_settimeout = setTimeout(this.motor_inset(), this.time_pause_motor);
    //     }
    // }
}

/***/ }),
/* 3 */
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
/***/ (function(module, exports, __webpack_require__) {

var Grid = __webpack_require__(0)

module.exports = class Ruler {
    constructor(view, grid, width, height) {
        var backdropContainer = null;
        var rulerContainer = null;
        var pointsRuler = [{}];
<<<<<<< HEAD
<<<<<<< HEAD
        var draggedSvg = null;
        var backdrop = null;
        var t = 0;
        var text = null;
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        var draggedSvg = null; 
        var backdrop = null; 
        var t = 0;  
        var text = null; 
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        var dragline = null;

        var xScale = d3.scaleLinear()
            .domain([-width / 2, width / 2])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([-height / 2, height / 2])
            .range([height, 0]);

<<<<<<< HEAD
<<<<<<< HEAD
        var buttonRuler = d3.select('.inset_content').append('button')
            .attr('class', 'button')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '260px')
            .style('left', '30px')
            .style('width', '80px')
            .on('click', function() {
                draggedSvg = backdropContainer.append('circle')
                    .attr('r', 50)
                    .attr('fill', 'none');
                t += 1;
            })
            .append('text')
                .text('Ruler');

        var dragme = d3.drag()
            .on('start', function(d) {
                var thisdragY = d3.select(this).attr('cy');
                var thisdragX = d3.select(this).attr('cx');
                var thisdragR = +d3.select(this).attr('r');

                if (t > 1) {
                    var coord = d3.mouse(this);
                    var xx = coord[0], yy = coord[1];
                    d3.selectAll('.lruler').remove();
                    d3.selectAll('.ruler').attr('cx', xx).attr('cy', yy);
                    rulerContainer.selectAll('.ruler2').remove();
                    rulerContainer.selectAll('.text').remove();
                }
                dragline = rulerContainer.append('line')
                        .attr('class', 'lruler')
                        .style('opacity', 0.5)
                        .style('stroke-linecap', 'round')
                        .attr('x1', thisdragX).attr('y1', thisdragY)
                        .attr('x2', thisdragX).attr('y2', thisdragY)
                        .style('stroke', 'black').style('stroke-width', '5');

                rulerContainer.append('circle')
                    .attr('class', 'ruler2')
                    .attr('cx', thisdragX)
                    .attr('cy', thisdragY)
                    .attr('r', 30)
                    .style('fill-opacity', 0.0);
            })
            .on('drag', function() {
                var coord = d3.mouse(this);
                var xx = coord[0], yy = coord[1];
                d3.selectAll('.lruler').attr('x2', xx).attr('y2', yy).style('stroke', 'blue');
                d3.selectAll('.ruler2').attr('cx', xx).attr('cy', yy);
            })
            .on('end', function(d) {
                d3.selectAll('.ruler2').call(d3.drag()
                    .on('drag', function() {
                        var coord = d3.mouse(this);
                        var xx = coord[0], yy = coord[1];
                        d3.selectAll('.lruler').attr('x2', xx).attr('y2', yy).style('stroke', 'blue');
                        d3.selectAll('.ruler2').attr('cx', xx).attr('cy', yy);
                        text
                            .attr('y', (yy > dragline.attr('y1') ? yy - 30 : yy + 30))
                            .attr('x', (xx > dragline.attr('x1') ? xx - 30 : xx + 30))
                            .attr('text-anchor', 'middle')
                            .text(Math.round(dragline.node().getTotalLength()));
                    })
                    .on('end', function() {
                        d3.selectAll('.lruler').style('stroke', 'black');
                    }));
                d3.select(this).call(d3.drag()
                    .on('drag', function() {
                        var coord = d3.mouse(this);
                        var xx = coord[0], yy = coord[1];
                        d3.selectAll('.lruler').attr('x1', xx).attr('y1', yy).style('stroke', 'blue');
                        d3.selectAll('.ruler').attr('cx', xx).attr('cy', yy);
                        text
                            .attr('text-anchor', 'middle')
                            .text(Math.round(dragline.node().getTotalLength()));
                    })
                    .on('end', function() {
                        d3.selectAll('.lruler').style('stroke', 'black');
                    }));
                d3.selectAll('.lruler').style('stroke', 'black');
                text = rulerContainer.append('text')
                    .attr('class', 'text')
                    .attr('y', (dragline.attr('y1') < dragline.attr('y2') ? dragline.attr('y2') - 30 : dragline.attr('y2') + 30))
                    .attr('x', (dragline.attr('x1') < dragline.attr('x2') ? dragline.attr('x2') - 30 : dragline.attr('x2') + 30))
                    .attr('text-anchor', 'middle')
                    .text(Math.round(dragline.node().getTotalLength()));
            });
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        // var buttonRuler = d3.select(".inset_content").append("button")
        //     .style('display', 'block')
        //     .style('position', 'absolute')
        //     .style('top', '260px')
        //     .style('left', '30px')
        //     .style('width', '80px')
        //     .on("click", function() {
        //         draggedSvg = backdropContainer.append('circle')
        //             .attr('r', 50)
        //             .attr('fill', 'none');
        //         t += 1;
        //     })
        //     .append('text')
        //         .text('Ruler');

        var dragme = d3.drag()
            .on("start", function(d) {
                var thisdragY = d3.select(this).attr("cy");
                var thisdragX = d3.select(this).attr("cx");
                var thisdragR = +d3.select(this).attr("r");
    
                if (t > 1) {
                    var coord = d3.mouse(this); 
                    var xx = coord[0], yy = coord[1];
                    d3.selectAll('.lruler').remove();
                    d3.selectAll('.ruler').attr("cx", xx).attr('cy', yy);
                    rulerContainer.selectAll('.ruler2').remove();
                    rulerContainer.selectAll('.text').remove();
                }
                dragline = rulerContainer.append("line")
                        .attr('class', 'lruler')
                        .style('fill-opacity', 0.0)
                        .attr("x1", thisdragX).attr("y1", thisdragY)
                        .attr("x2", thisdragX).attr("y2", thisdragY)
                        .style("stroke", "black").style("stroke-width", "1");
        
                rulerContainer.append("circle") 
                    .attr('class', 'ruler2')
                    .attr("cx", thisdragX)
                    .attr("cy", thisdragY)
                    .attr("r", thisdragR / 6)
                    .style('fill-opacity', 0.5)
                    .attr("fill", "black");
                rulerContainer.append("circle") 
                    .attr('class', 'ruler2')
                    .attr("cx", thisdragX)
                    .attr("cy", thisdragY)
                    .attr("r", thisdragR)
                    .style('fill-opacity', 0.0);
            })
            .on("drag", function() {
                var coord = d3.mouse(this); 
                var xx = coord[0], yy = coord[1];
                d3.selectAll('.lruler').attr("x2", xx).attr("y2", yy).style("stroke", "black");
                d3.selectAll(".ruler2").attr("cx", xx).attr("cy", yy).attr('fill', 'blue');
            })
            .on("end", function(d) {
                d3.selectAll(".ruler2").call(d3.drag()
                    .on("drag", function() {
                        var coord = d3.mouse(this); 
                        var xx = coord[0], yy = coord[1];
                        d3.selectAll('.lruler').attr("x2", xx).attr("y2", yy);
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
                        d3.selectAll('.lruler').attr("x1", xx).attr("y1", yy).style("stroke", "black");
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
                    .attr('class', 'text')
                    .attr("y", (dragline.attr("y1") < dragline.attr("y2") ? dragline.attr("y2") - 30 : dragline.attr("y2") + 30))
                    .attr("x", (dragline.attr("x1") < dragline.attr("x2") ? dragline.attr("x2") - 30 : dragline.attr("x2") + 30))
                    .attr('text-anchor', 'middle')
                    .text(Math.round(dragline.node().getTotalLength() * 1000) / 1000);
            });
        // buttonStyle(buttonRuler);
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

        backdropContainer = view.append('g')
            .attr('transform', function() {
                return 'translate(' + xScale(0) + ',' + yScale(0) + ')';
            });
<<<<<<< HEAD
<<<<<<< HEAD
        rulerContainer = view.selectAll('.backdrop')
                .attr('class', 'rulerContainer')
                .data(pointsRuler).enter().append('g')
                .attr('transform', () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        rulerContainer = view.selectAll(".backdrop")
                .attr("class", "rulerContainer")
                .data(pointsRuler).enter().append('g')
                .attr("transform", () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');
    
        view.on("dblclick", function(e) {
                // draggedSvg = backdropContainer.append('circle')
                //     .attr('r', 50)
                //     .attr('fill', 'none');
                // alert('');
                t += 1;
                // if (draggedSvg) {
                //     draggedSvg.remove();
                //     draggedSvg = null;
                    var mouse = d3.mouse(svg);
                    var x = mouse[0], y = mouse[1];
                    pointsRuler.push({ x: x, y: y });
                    rulerContainer.append('circle')
                        .attr('class', 'ruler')
                        .attr('cx', x).attr('cy', y)
                        .attr('r', 5)
                        .style('fill-opacity', 0.5)
                        .attr('fill', 'black');
                    rulerContainer.append('circle')
                        .attr('class', 'ruler')
                        .attr('cx', x).attr('cy', y)
                        .attr('r', 30)
                        .style('fill-opacity', 0.0)
                        .call(dragme);
                    // }
            });
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

        backdrop = backdropContainer
            .lower()
            .append('rect')
            .attr('class', 'backdrop')
            .attr('x', -width * 2)
            .attr('y', -height * 2)
            .attr('height', height * 3)
            .attr('width', width * 3)
            .attr('opacity', '0');
<<<<<<< HEAD
<<<<<<< HEAD

=======
    
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
    
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            backdrop.on('mousedown', function() {
                if (draggedSvg) {
                    draggedSvg.remove();
                    draggedSvg = null;
                    var mouse = d3.mouse(this);
                    var x = mouse[0], y = mouse[1];
                    pointsRuler.push({ x: x, y: y });

<<<<<<< HEAD
<<<<<<< HEAD
                    var cir = rulerContainer.append('circle')
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                    rulerContainer.append('circle')
                        .attr('class', 'ruler')
                        .attr('cx', x).attr('cy', y)
                        .attr('r', 5)
                        .style('fill-opacity', 0.5)
                        .attr('fill', 'black');

                    // rulerContainer.append("line")
                    //     .attr('class', 'lruler')
                    //     // .style('fill-opacity', 0.0)
                    //     .attr("x1", 0).attr("y1", 100)
                    //     .attr("x2", 0).attr("y2", 100)
                    //     .style("stroke", "black")
                    //     .style("stroke-width", "1");
                    rulerContainer.append('circle')
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                        .attr('class', 'ruler')
                        .attr('cx', x).attr('cy', y)
                        .attr('r', 30)
                        .style('fill-opacity', 0.0)
                        .call(dragme);
<<<<<<< HEAD
<<<<<<< HEAD
                    view.on('mousemove', function() {
                        // cir.call(dragme);

                    })

                }
            });
    }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Figure = __webpack_require__(6)
var Grid = __webpack_require__(0)
var Intersec = __webpack_require__(7)
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            alert('');
                }
            });
    }    
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Figure = __webpack_require__(5)
var Grid = __webpack_require__(0)
var Intersec = __webpack_require__(6)
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

module.exports = class Figures {
    constructor(view, grid, data, width, height) {
        var xScale = d3.scaleLinear()
            .domain([-width / 2, width / 2])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([-height / 2, height / 2])
            .range([height, 0]);

<<<<<<< HEAD
<<<<<<< HEAD
        this.pointsItems = [];
        this.itemContainer = view.selectAll('g')
                .attr('class', 'itemContainer')
                .data(data[0].res).enter().append('g')
                .attr('transform', () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        this.pointsItems = [];//data.input;//.concat(data.output);
        this.itemContainer = view.selectAll("g")
                .attr("class", "itemContainer")
                .data(data[0].res).enter().append('g')
                .attr("transform", () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

        this.animated = [];
        this.dataAnim = [];
        this.linepath = [];
<<<<<<< HEAD
<<<<<<< HEAD
        this.pauseValues = [];

        this.deleteItems = [];
=======
        this.pauseValues = []; 

        this.deleteItems = []; 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
        this.pauseValues = []; 

        this.deleteItems = []; 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        this.items = [];
        this.selected = [];

        var styles = {
            'res': { lwidth: 1.5, clrf: '#87CEFA', clr: '#00578a' },
            'sol': { lwidth: 1.5, clrf: '#FFA07A', clr: '#8a7c00' }
        }
        var styles2 = {
            'circle': { lwidth: 2.5, clrf: '#BC8F8F', clr: 'none' },
            'square': { lwidth: 2.5, clrf: '#3CB371', clr: 'none' },
            'line': { lwidth: 1.5, clrf: 'none', clr: 'black' },
            'point': { lwidth: 3, clrf: '#8B0000', clr: '#DC143C' }
        }

<<<<<<< HEAD
<<<<<<< HEAD

        for (var res = [], sol = [], i = 0; i < data.length; ++i) {
            if (data[i].class == 'intersection') {
                for (var j = 0; j < data[i].figures.length; ++j) {
                    if (this.items[data[i].figures[j][0] * 2].obj.attr('class') == 'line') {
                        var point = Intersec.intersectionLines(this.itemContainer, this.items[data[i].figures[j][0] * 2].obj, this.items[data[i].figures[j][1] * 2].obj);
                        new Figure('point', point.data, this.itemContainer, { lwidth: 3, clrf: point.intersec ? '#8B0000' : 'black', clr: 'IndianRed' });
                        point = Intersec.intersectionLines(this.itemContainer, this.items[data[i].figures[j][0] * 2 + 1].obj, this.items[data[i].figures[j][1] * 2 + 1].obj);
                        new Figure('point', point.data, this.itemContainer, { lwidth: 3, clrf: point.intersec ? '#8B0000' : 'black', clr: 'IndianRed' });
                    }
                    else if (this.items[data[i].figures[j][0] * 2].obj.attr('class') == 'selectCircle') {
                        var path = Intersec.intersectionCircles(this.itemContainer, this.items[data[i].figures[j][0] * 2].obj, this.items[data[i].figures[j][1] * 2].obj);
                        var path = Intersec.intersectionCircles(this.itemContainer, this.items[data[i].figures[j][0] * 2 + 1].obj, this.items[data[i].figures[j][1] * 2 + 1].obj);
                        // var obj = new Figure('path', path, this.itemContainer, { lwidth: 3, clrf: '#8B0000', clr: '#DC143C' });
                        // alert('');
                    }
                }
            }
            else {
                var buff = data[i].res.trim().split(/\s+/);
                for (var j = 0; j < buff.length; ++j) {
                    buff[j] = parseFloat(buff[j]);
                }
                res = buff;
                buff = data[i].sol.trim().split(/\s+/);
                for (var j = 0; j < buff.length; ++j)
                    buff[j] = parseFloat(buff[j]);
                sol = buff;


                var cl = (res.length > 4 && data[i].class != 'path') ? 'animated' + data[i].class : data[i].class;
                this.items.push(new Figure(cl, res, this.itemContainer, styles['res']));
                this.items.push(new Figure(cl, sol, this.itemContainer, styles['sol']));

                if (res.length > 4 && data[i].class != 'path') {
                    this.animated.push(this.items[this.items.length - 2]);
                    this.animated.push(this.items[this.items.length - 1]);
                    this.dataAnim.push({duration: 5000, r: Math.random() * 100});
                    this.dataAnim.push({duration: 5000, r: Math.random() * 100});
                    this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                    this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                    this.linepath.push(new Figure('path', res.slice(1, res.length), this.itemContainer, styles['res']));
                    this.linepath.push(new Figure('path', sol.slice(1, sol.length), this.itemContainer, styles['sol']));
                }
            }
        }
    }
}

/***/ }),
/* 6 */
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        for (var res = [], sol = [], i = 0; i < data.length; ++i) {
            if (data[i].class == 'intersection') {
                for (var j = 0; j < data[i].figures.length; ++j) {
                    if (this.items[data[i].figures[j][0] * 2].attr('class') == 'line') {
                        var point = Intersec.intersectionLines(this.itemContainer, this.items[data[i].figures[j][0] * 2], this.items[data[i].figures[j][1] * 2]);
                        var obj = new Figure('point', point.data, this.itemContainer, { lwidth: 3, clrf: point.intersec ? '#8B0000' : 'black', clr: 'IndianRed' });
                        obj.create();

                        point = Intersec.intersectionLines(this.itemContainer, this.items[data[i].figures[j][0] * 2 + 1], this.items[data[i].figures[j][1] * 2 + 1]);
                        obj = new Figure('point', point.data, this.itemContainer, { lwidth: 3, clrf: point.intersec ? '#8B0000' : 'black', clr: 'IndianRed' });
                        obj.create();
                    }
                    else if (this.items[data[i].figures[j][0] * 2].attr('class') == 'selectCircle') {
                        var path = Intersec.intersectionCircles(this.itemContainer, this.items[data[i].figures[j][0] * 2], this.items[data[i].figures[j][1] * 2]);
                        var path = Intersec.intersectionCircles(this.itemContainer, this.items[data[i].figures[j][0] * 2 + 1], this.items[data[i].figures[j][1] * 2 + 1]);
                        // var obj = new Figure('path', path, this.itemContainer, { lwidth: 3, clrf: '#8B0000', clr: '#DC143C' });
                        // obj.create();
                    }
                }
            }

            var buff = data[i].res.trim().split(/\s+/);
            for (var j = 0; j < buff.length; ++j) {
                buff[j] = parseFloat(buff[j]);
            }
            res = buff;
            buff = data[i].sol.trim().split(/\s+/);
            for (var j = 0; j < buff.length; ++j)
                buff[j] = parseFloat(buff[j]);
            sol = buff;


            var cl = (res.length > 4 && data[i].class != 'path') ? 'animated' + data[i].class : data[i].class;
            var obj1 = new Figure(cl, res, this.itemContainer, styles['res']);
            var obj2 = new Figure(cl, sol, this.itemContainer, styles['sol']);
            this.items.push(obj1.create());
            this.items.push(obj2.create());

            if (res.length > 4 && data[i].class != 'path') {
                this.animated.push(this.items[this.items.length - 2]);
                this.animated.push(this.items[this.items.length - 1]);
                this.dataAnim.push({duration: 5000, r: Math.random() * 100});
                this.dataAnim.push({duration: 5000, r: Math.random() * 100});
                this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                var linepath = new Figure('path', res.slice(1, res.length), this.itemContainer, styles['res']);
                this.linepath.push(linepath.create());
                linepath = new Figure('path', sol.slice(1, res.length), this.itemContainer, styles['sol']);
                this.linepath.push(linepath.create());
            }
        }
    }  
    
    ///////////////////////////////////// selection ///////////////////////////////////////
    
    // selectItem(d) {
    //     for (var i = 0; i < this.selected.length; ++i) {
    //         if (this.selected[i] == this) {
    //             var el = d3.select(this);
    //             this.selected.splice(i, 1);
    //             el
    //                 .style('stroke-width', 'none')
    //                 .style('stroke', 'none');
    //             return;
    //         }
    //     }
    //     this.selected.push(this);
    //     var el = d3.select(this);
    //     el
    //         .style('stroke-width', 2)
    //         .style('stroke', 'black');
    // }
    
    // zoomItem(k) {
    //     for (var i = 0; i < this.selected.length; i++) {
    //         var el = d3.select(this.selected[i]);
    //         if (el.attr('class') == 'selectSquare') {
    //             var w = +el.attr('width'), h = +el.attr('height');
    //             var x = +el.attr('x'), y = +el.attr('y');
    //             el.attr('width', w + k).attr('height', h + k);
    //             // el.attr('x', x - k / 2); el.attr('y', y - k / 2);
    //         }
    //         else if (el.attr('class') == 'selectCircle') {
    //             var r = +el.attr('r');
    //             el.attr('r', r + k);
    //         }
    //     }
    // } 
    
    // buttons() {
    //     var zoomInItem = d3.select(".inset_content").append("button")
    //         .attr('class', 'button')
    //         .style('display', 'block')
    //         .style('position', 'absolute')
    //         .style('top', '140px')
    //         .style('left', '30px')
    //         .style('width', '30px')
    //         .on("click", function() {
    //             zoomItem(10);
    //         })
    //         .append('text')
    //             .text('+');
    
    //     var zoomOutItem = d3.select(".inset_content").append("button")
    //         .attr('class', 'button')
    //         .style('display', 'block')
    //         .style('position', 'absolute')
    //         .style('top', '170px')
    //         .style('left', '30px')
    //         .style('width', '30px')
    //         .on("click", function() {
    //             zoomItem(-10);
    //         })
    //         .append('text')
    //             .text('-');
    
    // ///////////////////////////////////// add delete ///////////////////////////////////////

    //     var addItem = d3.select(".inset_content").append("button")
    //         .attr('class', 'button')
    //         .style('display', 'block')
    //         .style('position', 'absolute')
    //         .style('top', '210px')
    //         .style('left', '30px')
    //         .style('width', '80px')
    //         .on("click", function() {
    //             items.push(getItem(itemContainer, deleteItems.pop()));
    //         })
    //         .append('text')
    //             .text('Add');
    
    //     var deleteItem = d3.select(".inset_content").append("button")
    //         .attr('class', 'button')
    //         .style('display', 'block')
    //         .style('position', 'absolute')
    //         .style('top', '240px')
    //         .style('left', '30px')
    //         .style('width', '80px')
    //         .on("click", function() {
    //             Figures.deleteItems.push({ data: pointsItems[items.length], obj: items.pop().remove()});
    //         })
    //         .append('text')
    //             .text('Delete');   
    // }
}   

/***/ }),
/* 5 */
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
/***/ (function(module, exports) {

module.exports = class Figure {
	constructor(cl, data, container, style) {
        this.data = data;
        this.obj = null;
        this.style = style;
        this.class = cl;
        this.container = container;
<<<<<<< HEAD
<<<<<<< HEAD
        this.datapath = data.slice(1, data.length);

=======
    } 

    create() {
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
    } 

    create() {
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        var item = this.class;
        switch (item) {
            case 'selectSquare':
            case 'square':
<<<<<<< HEAD
<<<<<<< HEAD
                this.obj = Square(this.data, this.container, this.style);
                break;
            case 'selectCircle':
            case 'circle':
                this.obj = Circle(this.data, this.container, this.style);
                break;
            case 'animatedcircle':
               this.obj = AnimatedCircle(this.data, this.container, this.style);
               break;
            case 'selectArc':
                this.obj = Arc(this.data, this.container, this.style);
                break;
            case 'draggableCircle':
                this.obj = draggableCircle(this.data, this.container);
                break;
            case 'resizingCircle':
                this.obj = resizingCircle(this.data, this.container);
                break;
            case 'line':
                this.obj = Line(this.data, this.container, this.style);
                break;
            case 'point':
                this.obj = IntersectionPoint(this.data, this.container, this.style);
                break;
            case 'path':
                this.obj = Path(this.data, this.container, this.style);
                break;
            default:
                break;
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                return Square(this.data, this.container, this.style);
            case 'selectCircle':
            case 'circle':
                return Circle(this.data, this.container, this.style);
            case 'animatedcircle':
               return AnimatedCircle(this.data, this.container, this.style);
            case 'selectArc':
                return Arc(this.data, this.container, this.style);
            case 'draggableCircle':
                return draggableCircle(this.data, this.container);
            case 'resizingCircle':
                return resizingCircle(this.data, this.container);
            case 'line':
                return Line(this.data, this.container, this.style);
            case 'point':
                return IntersectionPoint(this.data, this.container, this.style);
            case 'path':
                return Path(this.data, this.container, this.style);
            default:
                break;        
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        }
    }
}

<<<<<<< HEAD
<<<<<<< HEAD
function Circle(data, container, style) {
    return container.append('circle')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
function Circle(data, container, style) {   
    return container.append('circle')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth) 
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        .style('fill-opacity', 0.8)
        .attr('fill', style.clrf)
        .attr('class', 'selectCircle')
        .attr('cx', data[0])
        .attr('cy', data[1])
        .attr('r', data[2]);
        // .on('click', selectItem);
}

function Path(data, container, style) {
    data = data.map((_, i, a) => a.slice(i * 2, i * 2 + 2)).filter((el) => el.length);

    var line = d3.line()
        .x(function(d) {
            return (d)[0];
        })
        .y(function(d) {
            return (d)[1];
        });
<<<<<<< HEAD
<<<<<<< HEAD

    return container.append('g').append('path')
        .data([data])
        .attr('class', 'path')
        .attr('d', line)
        .attr('d', function(d) {
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    
    return container.append("g").append("path")
        .data([data])
        .attr('class', 'path')
        .attr("d", line)
        .attr("d", function(d) {
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            return line(d);
        })
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
<<<<<<< HEAD
<<<<<<< HEAD
        .attr('fill', 'none')
        .style('stroke-dasharray', '4px, 8px');
}

function IntersectionPoint(data, container, style) {
    container.append('text')
        .attr('class', 'textCoord')
        .attr('y', data[1] - 20)
        .attr('x', data[0])
        .attr('text-anchor', 'middle')
        .text('x: ' + Math.round(data[0]) + '; y: ' + Math.round(data[1]));
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        .attr("fill", "none")
        .style('stroke-dasharray', '4px, 8px');      
}
    
function IntersectionPoint(data, container, style) {
    container.append("text")
        .attr('class', 'textCoord')
        .attr("y", data[0] - 20)
        .attr("x", data[1])
        .attr('text-anchor', 'middle')
        .text('x: ' + data[0] + '; y: ' + data[1]);
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a

    return container.append('circle')
        .attr('class', 'point')
        .style('stroke', style.clr)
<<<<<<< HEAD
<<<<<<< HEAD
        .style('stroke-width', style.lwidth)
=======
        .style('stroke-width', style.lwidth) 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
        .style('stroke-width', style.lwidth) 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        .attr('fill', style.clrf)
        .attr('cx', data[0])
        .attr('cy', data[1])
        .attr('r', data[2]);
}
<<<<<<< HEAD
<<<<<<< HEAD

function AnimatedCircle(data, container, style) {
    var circle = Circle([0, 0, data[0]], container, style);
    circle.attr('class', 'animatedCircle');
    circle.transition().attr('transform', 'translate(' + data[1] + ',' + data[2] + ')');
    return circle;
}

function Line(data, container, style) {
    return container.append('line')
        .style('shape-rendering','crispEdges')
        .style('stroke', style.clr)
        .style('stroke-width', 1)
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    
function draggableCircle(data, container) {
    var draggableCircle = Circle(data, container);
    return draggableCircle
        .attr('class', 'draggableCircle')
        .style('fill-opacity', 0.5)
        .call(d3.drag()
            .on('drag', function() {
                container.select(this)
                    .attr('cx', d3.event.x)
                    .attr('cy', d3.event.y);
            }));
}

function resizingCircle(data, container) {
    var draggableCircle = draggableCircle(data, container, {x: data.x, y: data.y, size: data.size - 6}, {lwidth: 0, clrf: 'none', clr: 'none'});
    var resizingCircle = Circle(data, container);
    return resizingCircle
        .attr('class', 'resizingContainer')
        .style('cursor', 'nesw-resize') 
        .style('fill-opacity', 0.5)
        .call(d3.drag()
            .on('drag', function() {
                container.select('.resizingContainer')
                    .attr('r', function(c) {
                        return Math.pow(Math.pow(this.attributes.cx.value - d3.event.x, 2) 
                            + Math.pow(this.attributes.cy.value - d3.event.y, 2), 0.5);
                    });
                container.selectAll('.draggableCircle')
                    .attr('r', function(c) {
                        return Math.pow(Math.pow(this.attributes.cx.value - d3.event.x, 2) 
                            + Math.pow(this.attributes.cy.value - d3.event.y, 2), 0.5) - 6;
                    });
            }));
}

function AnimatedCircle(data, container, style) { 
    var circle = Circle([0, 0, data[0]], container, style);
    circle.attr('class', 'animatedCircle');
    circle.transition().attr("transform", "translate(" + data[1] + "," + data[2] + ")");
    return circle;
}
    
function Line(data, container, style) {    
    return container.append('line')
        .style('stroke', style.clr)
        // .style('stroke-width', style.lwidth)
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        .attr('class', 'line')
        .attr('x1', data[0])
        .attr('y1', data[1])
        .attr('x2', data[2])
        .attr('y2', data[3]);
<<<<<<< HEAD
<<<<<<< HEAD
}

function Square(data, container, style) {
=======
}  

function Square(data, container, style) { 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
}  

function Square(data, container, style) { 
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    return container.append('rect')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
        .attr('fill', style.clrf)
<<<<<<< HEAD
<<<<<<< HEAD
        .style('fill-opacity', 0.8)
        .attr('class', 'selectSquare')
        .attr('x', data[0])
        .attr('y', data[1])
        .attr('width', data[2])
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        .style('fill-opacity', 0.7)
        .attr('class', 'selectSquare')
        .attr('x', data[0])
        .attr('y', data[1])
        .attr('width', data[2]) 
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        .attr('height', data[2])
        .attr('data-rotation', 0)
        .attr('rx', 0);
        // .on('click', selectItem);
}
<<<<<<< HEAD
<<<<<<< HEAD

function Arc(data, container, style) {
=======
    
function Arc(data, container, style) {   
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
    
function Arc(data, container, style) {   
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    var arc = d3.arc()
        .innerRadius(data[2])
        .outerRadius(data[3])
        .startAngle(45 * (Math.PI / 180))
        .endAngle(10);
<<<<<<< HEAD
<<<<<<< HEAD

    return container.append('g').append('path')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
        .style('fill-opacity', 0.8)
        .attr('class', 'selectArc')
        .attr('fill', style.clrf)
        .attr('d', arc)
        .attr('transform', 'translate(' + data[0] + ',' + data[1] +')');
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    
    return container.append("g").append("path")
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth)
        .style('fill-opacity', 0.5)
        .attr('class', 'selectArc')
        .attr('fill', style.clrf)
        .attr('d', arc)
        .attr('transform', "translate(" + data[0] + "," + data[1] +")");
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
        // .on('click', selectItem);
}

/***/ }),
<<<<<<< HEAD
<<<<<<< HEAD
/* 7 */
=======
/* 6 */
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
/* 6 */
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
/***/ (function(module, exports) {

module.exports = class Intersections {
    static intersectionLines(container, d1, d2) {
        var det = (d1.attr('x1') - d1.attr('x2')) * (d2.attr('y1') - d2.attr('y2')) - (d1.attr('y1') - d1.attr('y2')) * (d2.attr('x1') - d2.attr('x2'));
        var _d1 = d1.attr('x1') * d1.attr('y2') - d1.attr('y1') * d1.attr('x2'),
            _d2 = d2.attr('x1') * d2.attr('y2') - d2.attr('y1') * d2.attr('x2');
        var ix = (_d1 * (d2.attr('x1') - d2.attr('x2')) - _d2 * (d1.attr('x1') - d1.attr('x2'))) / det,
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            iy = (_d1 * (d2.attr('x1') - d2.attr('y2')) - _d2 * (d1.attr('y1') - d1.attr('y2'))) / det;
        var isIntersection = !(d1.attr('x1') < ix ^ ix < d1.attr('x2')) && !(d2.attr('x1') < ix ^ ix < d2.attr('x2'));
    
        // Figure.pointsItems.push({ x: ix, y: iy, size: 3 });
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
    
        container.append("g").append("path")
            .attr("d", function() {
                return "M" + xi + "," + yi + "A" + d2.attr('r') + "," + d2.attr('r') +
                " 0 0,1 " + xi_prime + "," + yi_prime + "A" + d1.attr('r') + "," + d1.attr('r') +
                " 0 0,1 " + xi + "," + yi;
            })
            .style('fill-opacity', 0.7)
            .style('fill', 'IndianRed');

        return "M" + xi + "," + yi + "A" + d2.attr('r') + "," + d2.attr('r') +
                " 0 0,1 " + xi_prime + "," + yi_prime + "A" + d1.attr('r') + "," + d1.attr('r') +
                " 0 0,1 " + xi + "," + yi;

<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    }
}

/***/ }),
<<<<<<< HEAD
<<<<<<< HEAD
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Slider = __webpack_require__(1)

module.exports = class Animation {
    constructor(obj) {
        var speed = { val: 0.1 };

        function translateAlong(obj, j) {
            var l = obj.linepath[j].obj.node().getTotalLength();
            return function(d, i, a) {
                return function(t) {
                    t += obj.pauseValues[j].lastTime;
                    var p = obj.linepath[j].obj.node().getPointAtLength(t * l);
                    obj.pauseValues[j].currentTime = t;
                    return 'translate(' + p.x + ',' + p.y + ')';
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
/* 7 */
/***/ (function(module, exports) {

module.exports = class Animation {    
    constructor(obj) {
        function translateAlong(obj, j) {
            var l = obj.linepath[j].node().getTotalLength();
            return function(d, i, a) {
                return function(t) {
                    t += obj.pauseValues[j].lastTime;
                    var p = obj.linepath[j].node().getPointAtLength(t * l);
                    obj.pauseValues[j].currentTime = t;
                    return "translate(" + p.x + "," + p.y + ")";
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                };
            };
        }

        function transition(obj, i) {
<<<<<<< HEAD
<<<<<<< HEAD
            var l = obj.linepath[i].obj.node().getTotalLength();
            obj.animated[i].obj.transition()
                .duration(l / speed.val)
                .ease(d3.easeLinear)
                // .attr('r', obj.dataAnim[i].r)
                .attrTween('transform', translateAlong(obj, i))
                .on('end', function() {
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            obj.animated[i].transition()
                .duration(obj.dataAnim[i].duration - (obj.dataAnim[i].duration * obj.pauseValues[i].lastTime))
                // .attr('r', obj.dataAnim[i].r)
                .attrTween("transform", translateAlong(obj, i))
                .on("end", function() {
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                    obj.pauseValues[i] = { lastTime: 0, currentTime: 0 };
                });
        }

<<<<<<< HEAD
<<<<<<< HEAD
        var start = d3.select('.inset_content').append('button')
=======
        var start = d3.select(".inset_content").append("button")
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
        var start = d3.select(".inset_content").append("button")
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            .attr('class', 'button')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '80px')
            .style('left', '30px')
            .style('width', '80px')
<<<<<<< HEAD
<<<<<<< HEAD
            .on('click', function() {
                for (var i = 0; i < obj.animated.length; ++i) {
                    obj.animated[i].obj.attr('transform', 'translate(' + 100 + ',' + 100 + ')');
                    obj.animated[i].obj.attr('r', obj.animated[i].obj.attr('r'));
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            .on("click", function() {
                for (var i = 0; i < obj.animated.length; ++i) {
                    obj.animated[i].attr("transform", "translate(" + 100 + "," + 100 + ")");
                    obj.animated[i].attr('r', obj.animated[i].attr('r'));
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                    obj.pauseValues[i].lastTime = obj.pauseValues[i].currentTime = 0;
                    transition(obj, i);
                }
            })
            .append('text')
<<<<<<< HEAD
<<<<<<< HEAD
                .text('Start');

        var pause = d3.select('.inset_content').append('button')
=======
                .text('Start');         
    
        var pause = d3.select(".inset_content").append("button")
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
                .text('Start');         
    
        var pause = d3.select(".inset_content").append("button")
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
            .attr('class', 'button')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '110px')
            .style('left', '30px')
            .style('width', '80px')
<<<<<<< HEAD
<<<<<<< HEAD
            .on('click', function(d) {
=======
            .on("click", function(d) {
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
            .on("click", function(d) {
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                var button = d3.select(this);
                if (d3.select('.btext').text() == 'Pause') {
                    d3.select('.btext').text('Resume');
                    for (var i = 0; i < obj.animated.length; ++i) {
<<<<<<< HEAD
<<<<<<< HEAD
                        obj.animated[i].obj.interrupt();
                    }
                    setTimeout(function() { obj.pauseValues[0].lastTime = obj.pauseValues[0].currentTime; }, 100);
                    setTimeout(function() { obj.pauseValues[1].lastTime = obj.pauseValues[1].currentTime; }, 100);
                }
=======
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                        obj.animated[i].transition().duration(0);
                    }
                    setTimeout(function() { obj.pauseValues[0].lastTime = obj.pauseValues[0].currentTime; }, 100);
                    setTimeout(function() { obj.pauseValues[1].lastTime = obj.pauseValues[1].currentTime; }, 100);
                } 
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
                else {
                    d3.select('.btext').text('Pause');
                    for (var i = 0; i < obj.animated.length; ++i) {
                        transition(obj, i);
                    }
                }
            })
            .append('text')
                .text('Pause')
                .attr('class', 'btext');
<<<<<<< HEAD
<<<<<<< HEAD

        var j = 0;
        var nextStep = d3.select('.inset_content').append('button')
            .attr('class', 'button')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '190px')
            .style('left', '30px')
            .style('width', '80px')
            .on('click', function(d) {
                ++j;
                for (var i = 0; i < obj.animated.length; ++i) {
                    if (j * 2 + 1 >= obj.animated[i].datapath.length) {
                        --j; continue;
                    }
                    obj.animated[i].obj.attr('transform', 'translate(' + obj.animated[i].datapath[j * 2] + ',' + obj.animated[i].datapath[j * 2 + 1] + ')');
                }
            })
            .append('text')
                .text('>>')
                .attr('class', 'btext');

        var prevStep = d3.select('.inset_content').append('button')
            .attr('class', 'button')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '220px')
            .style('left', '30px')
            .style('width', '80px')
            .on('click', function(d) {
                --j;
                for (var i = 0; i < obj.animated.length; ++i) {
                    if (j < 0) {
                        ++j; continue;
                    }
                    obj.animated[i].obj.attr('transform', 'translate(' + obj.animated[i].datapath[j * 2] + ',' + obj.animated[i].datapath[j * 2 + 1] + ')');
                }
            })
            .append('text')
                .text('<<')
                .attr('class', 'btext');

        function fun(args, xVal) {
            args.speed.val = xVal;
        }

        new Slider(95, 0, [0.001, 0.51], 'olol', fun, { speed: speed })
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
    }
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=visualizer.js.map