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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Slider = __webpack_require__(1)

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = class Slider {
    constructor(top, left, range, cl, fun, args, init, tickname) {
        var step = 0, widthSlider = 70, xVal = 0,
            margin = {top: 35, left: 10}, height = 50;

        var slider = d3.select('.inset_content').append('svg')
            .attr('width', widthSlider + height)
            .attr('height', height)
            .attr('transform', 'translate(' + left +', '+ top + ')')
                .append('g')
                    .classed('slider', true)
                    .attr('transform', 'translate(' + margin.top +', '+ margin.left + ')');

        var xScaleSlider = d3.scaleLinear()
            .domain(range)
            .range([0, widthSlider])
            .clamp(true);
        var rangeValues = d3.range(range[0], range[1], step || 1).concat(range[1]);
        var xAxisSlider = d3.axisBottom(xScaleSlider)
            .tickValues(rangeValues)
            .tickFormat(function (d) {
                if (tickname) {
                    for (var i = 0; i < range.length; ++i) {
                        if (d == range[i]) return tickname[i];
                    }
                }
                else if (d % 5 == 0)
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

        var trackInset = d3.select(slider.node().appendChild(track.node().cloneNode()))
            .attr('class', 'track-inset')
            .style('stroke-linecap', 'round')
            .style('stroke-width', '8px')
            .style('stroke', '#ededed');

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
                var i = d3.interpolate(0, init);
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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var Panel = __webpack_require__(3)
var Grid = __webpack_require__(0)
var Ruler = __webpack_require__(4)
var Figures = __webpack_require__(5)
var Anim = __webpack_require__(8)
var Config = __webpack_require__(9)

class Visualizer {
    static SVG(data) {
        d3.select('body').append('div')
            .attr('class', 'block')
            .style('position', 'absolute')
            .style('top', '30px')
            .style('left', '50px')
            .attr('width', Config.width)
            .attr('height', Config.height)
            .style('background-color', '#eee')
            .style('font-family', 'Times New Roman')
            .style('font-size', '15px');

        d3.select('.block').append('svg')
            .attr('width', Config.width)
            .attr('height', Config.height)
            .attr('display', 'block')
            .append('g')
                .attr('class', 'svg')
                .attr('transform', 'translate(' + Config.margin.left + ',' + Config.margin.top + ')');

        d3.select('.svg').append('text')
            .attr('class', 'coord')
            .attr('x', (Config.width - Config.margin.left - Config.margin.right) / 2)
            .attr('y', Config.height - Config.margin.top - (Config.margin.bottom / 2))
            .attr('text-anchor', 'middle')
            .text('0, 0');

        this.canvas(data);
    }

    static canvas(data) {
        d3.select('.svg').append('svg')
            .attr('id', 'view')
            .attr('class', 'view')
            .attr('width', Config.width - Config.margin.left - Config.margin.right)
            .attr('height', Config.height - Config.margin.top - Config.margin.bottom)
            .attr('left', Config.margin.left)
            .attr('top', Config.margin.top)
            .append('g')
                .attr('class', 'viewg')
                .style('font-size', '12px');

        Panel.create();
        Grid.create();
        Ruler.create();
        Anim.create(new Figures(data));

        d3.selectAll('.button')
            .datum(Config.button)
            .styles(function(d) { return d; })
            .on('mouseover', function() {
                var button = d3.select(this);
                button.style('background-color', '#696969');
            })
            .on('mouseleave', function() {
                d3.select(this).style('background-color', '#CD5C5C');
            });
    }
}
/* harmony export (immutable) */ __webpack_exports__["Visualizer"] = Visualizer;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = class Panel {
    static create() {
        var block_inset = d3.select('.block').append('div')
            .attr('class', 'block_inset')
            .attr('id', 'block_inset')
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

        var inset_content = d3.select('.inset_num').append('div')
            .attr('class', 'inset_content')
            .style('position', 'relative')
            .style('margin', '0px')
            .style('padding', '0px')
            .style('width', '100%')
            .style('height', '100%')
            .style('color', '#fff')
            .style('background-color', 'rgba(0, 0, 0, 0.8)')
            .style('overflow-y', 'auto');
    }
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = class Ruler {
    static create() {
        var width = d3.select('.view').attr('width'),
            height = d3.select('.view').attr('height'),
            rulerContainer = null,
            pointsRuler = [{}];

        var xScale = d3.scaleLinear()
            .domain([-width / 2, width / 2])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([-height / 2, height / 2])
            .range([height, 0]);

        d3.select('.viewg').append('g')
                .attr('class', 'itemContainer')
                .attr('transform', () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');

         function snapToGrid(p, r) {
            return Math.round(p / r) * r;
        }

        function dragCircle(circle, mouse) {
            circle.attr('cx', mouse[0]).attr('cy', mouse[1]);
            var rp = d3.select('.left_ruler_point');
            var lp = d3.select('.right_ruler_point');
            var x1 = snapToGrid(lp.attr('cx'), 1);
            var y1 = snapToGrid(lp.attr('cy'), 1);
            var x2 = snapToGrid(rp.attr('cx'), 1);
            var y2 = snapToGrid(rp.attr('cy'), 1);
            var line = d3.select('.ruler_line')
                .attr('x1', x1)
                .attr('y1', y1)
                .attr('x2', x2)
                .attr('y2', y2)
                .style('stroke', 'blue');
            d3.select('.text')
                .attr('y', +y1 + (y2 - y1) / 2 - 10)
                .attr('x', +x1 + (x2 - x1) / 2)
                .text(Math.round(line.node().getTotalLength() * 100) / 100);
        }

        function createCircle(x, y, classname) {
            rulerContainer.append('circle')
                .attr('class', classname)
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 20)
                .attr('fill-opacity', 0.0)
                .call(d3.drag()
                    .on('drag', function(data) {
                        dragCircle(d3.select(this), d3.mouse(this));
                    })
                    .on('end', function() {
                        d3.select('.ruler_line')
                            .style('stroke', 'black');
                    })
                );
        }

        d3.select('.inset_content').append('button')
            .attr('class', 'button')
            .style('top', '260px')
            .style('left', '30px')
            .on('click', function() {
                d3.select('.itemContainer')
                    .lower()
                    .append('rect')
                    .attr('class', 'backdropContainer')
                    .attr('x', -width * 2)
                    .attr('y', -height * 2)
                    .attr('height', height * 3)
                    .attr('width', width * 3)
                    .attr('fill-opacity', 0.0)
                    .call(d3.drag()
                        .on('start', function(data) {
                            d3.select('.left_ruler_point').remove();
                            d3.select('.right_ruler_point').remove();
                            d3.select('.ruler_line').remove();
                            d3.select('.text').remove();
                            var mouse = d3.mouse(this);
                            var x = snapToGrid(mouse[0], 1);
                            var y = snapToGrid(mouse[1], 1);
                            pointsRuler.push({ x: x, y : y});
                            createCircle(x, y, 'left_ruler_point');
                            createCircle(x, y, 'right_ruler_point');
                            var line = rulerContainer.append('line')
                                .attr('class', 'ruler_line')
                                .style('opacity', 0.3)
                                .attr('x1', x).attr('y1', y)
                                .attr('x2', x).attr('y2', y)
                                .style('stroke-dasharray', '0.9 0.1')
                                .style('stroke', 'black')
                                .style('stroke-width', 7)
                                .on('dblclick.zoom', function() {
                                    d3.selectAll('.backdropContainer').remove();
                                    d3.select('.left_ruler_point').remove();
                                    d3.select('.right_ruler_point').remove();
                                    d3.select('.ruler_line').remove();
                                    d3.select('.text').remove();
                                });
                            rulerContainer.append('text')
                                .attr('class', 'text')
                                .attr('text-anchor', 'middle')
                                .text(Math.round(line.node().getTotalLength() * 1000) / 1000);
                        })
                        .on('drag', function(data) {
                            dragCircle(d3.select('.right_ruler_point'), d3.mouse(this));
                        })
                        .on('end', function(data) {
                            d3.select('.ruler_line')
                                .style('stroke', 'black');
                            d3.selectAll('.backdropContainer').remove();
                        })
                    );
            })
            .append('text')
                .text('Ruler');

        rulerContainer = d3.select('.viewg').selectAll('.backdrop')
                .attr('class', 'rulerContainer')
                .data(pointsRuler).enter().append('g')
                .attr('transform', () => 'translate(' + xScale(0) + ',' + yScale(0) + ')');

        d3.select('.itemContainer')
            .lower()
            .append('rect')
            .attr('class', 'backdrop')
            .attr('x', -width * 2)
            .attr('y', -height * 2)
            .attr('height', height * 3)
            .attr('width', width * 3)
            .attr('fill-opacity', 0.0);
    }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Figure = __webpack_require__(6)
var Grid = __webpack_require__(0)
var Intersec = __webpack_require__(7)

module.exports = class Figures {
    constructor(data) {
        function parseData(data) {
            return { x: data[0], y: data[1] };
        }

        function parseDataObj(obj) {
            return { x: obj.attr('x2'), y: obj.attr('y2') };
        }

        var width = d3.select('.view').attr('width'),
            height = d3.select('.view').attr('height');

        this.itemContainer = d3.select('.itemContainer');
        this.animated = [];
        this.dataAnim = [];
        this.linepath = [];
        this.pauseValues = [];
        this.items = [];

        var styles = {
            res  : { 'stroke-width': 1.5, fill: '#87CEFA', opacity: 0.8, 'stroke-opacity': 0.7, stroke: '#00578a' },
            sol  : { 'stroke-width': 1.5, fill: '#FFA07A', opacity: 0.8, 'stroke-opacity': 0.7, stroke: '#8a7c00' },
            point: function(intersec) {
                return { 'stroke-width': 3, fill: intersec ? '#8B0000' : 'black', stroke: 'IndianRed' };
            }
        }

        for (var res = [], sol = [], i = 0; i < data.length; ++i) {
            if (data[i].class == 'intersection' || data[i].class == 'angle') {
                for (var j = 0; j < data[i].figures.length; ++j) {
                    if (this.items[data[i].figures[j][0] * 2].obj.attr('class') == 'line') {
                        var point_res = Intersec.intersectionLines(this.itemContainer, this.items[data[i].figures[j][0] * 2].obj, this.items[data[i].figures[j][1] * 2].obj);
                        var point_sol = Intersec.intersectionLines(this.itemContainer, this.items[data[i].figures[j][0] * 2 + 1].obj, this.items[data[i].figures[j][1] * 2 + 1].obj);
                        new Figure('point', point_res.data, this.itemContainer, styles.point(point_res.intersec));
                        new Figure('point', point_sol.data, this.itemContainer, styles.point(point_sol.intersec));
                        if (data[i].class == 'angle') {
                            if (point_res.intersec)
                                new Figure('angle', [parseData(point_res.data), parseDataObj(this.items[data[i].figures[j][0] * 2].obj),
                                        parseDataObj(this.items[data[i].figures[j][1] * 2].obj)], this.itemContainer, styles.res);
                            if (point_sol.intersec)
                                new Figure('angle', [parseData(point_sol.data), parseDataObj(this.items[data[i].figures[j][0] * 2 + 1].obj),
                                        parseDataObj(this.items[data[i].figures[j][1] * 2 + 1].obj)], this.itemContainer, styles.sol);
                        }
                    }
                    else if (this.items[data[i].figures[j][0] * 2].obj.attr('class') == 'circle') {
                        var path = Intersec.intersectionCircles(this.itemContainer, this.items[data[i].figures[j][0] * 2].obj, this.items[data[i].figures[j][1] * 2].obj);
                        var path = Intersec.intersectionCircles(this.itemContainer, this.items[data[i].figures[j][0] * 2 + 1].obj, this.items[data[i].figures[j][1] * 2 + 1].obj);
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
                this.items.push(new Figure(cl, res, this.itemContainer, styles.res));
                this.items.push(new Figure(cl, sol, this.itemContainer, styles.sol));

                if (res.length > 4 && data[i].class != 'path') {
                    this.animated.push(this.items[this.items.length - 2]);
                    this.animated.push(this.items[this.items.length - 1]);
                    this.dataAnim.push({duration: 5000, r: Math.random() * 100});
                    this.dataAnim.push({duration: 5000, r: Math.random() * 100});
                    this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                    this.pauseValues.push({ lastTime: 0, currentTime: 0 });
                    this.linepath.push(new Figure('path', res.slice(1, res.length), this.itemContainer, styles.res));
                    this.linepath.push(new Figure('path', sol.slice(1, sol.length), this.itemContainer, styles.sol));
                }
            }
        }
    }
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = class Figure {
	constructor(cl, data, container, style) {
        this.data = data;
        this.obj = null;
        this.style = style;
        this.class = cl;
        this.container = container;
        this.datapath = data.slice(1, data.length);

        var item = this.class;
        switch (item) {
            case 'square':
                this.obj = Square(this.data, this.container, this.style);
                break;
            case 'circle':
                this.obj = Circle(this.data, this.container, this.style);
                break;
            case 'animatedcircle':
               this.obj = AnimatedCircle(this.data, this.container, this.style);
               break;
            case 'arc':
                this.obj = Arc(this.data, this.container, this.style);
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
            case 'angle':
                this.obj = Angle(this.data, this.container, this.style);
                break;
            default:
                break;
        }
    }
}

function Circle(data, container, style) {
    return container.append('circle')
        .datum(style)
        .styles(function(d) { return d; })
        .attr('class', 'circle')
        .attr('cx', data[0])
        .attr('cy', data[1])
        .attr('r', data[2]);
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

    return container.append('g').append('path')
        .data([data])
        .attr('class', 'path')
        .attr('d', line)
        .attr('d', function(d) {
            return line(d);
        })
        .style('stroke', style.stroke)
        .attr('fill', 'none')
        .style('stroke-dasharray', '4px, 8px');
}

function IntersectionPoint(data, container, style) {
    var margin = {top: 40, right: 40, bottom: 50, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var xScale = d3.scaleLinear()
            .domain([-width / 2, width / 2])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([-height / 2, height / 2])
            .range([0, height]);

    container.append('text')
        .attr('class', 'textCoord')
        // .attr('data', [data[0], data[1] - 20])
        .attr('x', data[0])
        .attr('y', data[1] - 20)
        .attr('text-anchor', 'middle')
        .text(Math.round(data[0]) + ', ' + Math.round(data[1]))
        .attr('font-weight', 100)
        .attr('font-family', 'Times New Roman')
        .attr('font-size', '12px');
        // .attr('transform', function(d) {
        //             return "translate(" + xScale(d[0]) + "," + yScale(d[1]) + ")";
        //         });

    return container.append('circle')
        .attr('class', 'point')
        .datum(style)
        .styles(function(d) { return d; })
        .attr('cx', data[0])
        .attr('cy', data[1])
        .attr('r', data[2]);
}

function AnimatedCircle(data, container, style) {
    var circle = Circle([0, 0, data[0]], container, style);
    circle.attr('class', 'animatedCircle');
    circle.transition().attr('transform', 'translate(' + data[1] + ',' + data[2] + ')');
    return circle;
}

function Line(data, container, style) {
    return container.append('line')
        .style('shape-rendering','crispEdges')
        .style('stroke', style.stroke)
        .style('stroke-width', 1)
        .attr('class', 'line')
        .attr('x1', data[0])
        .attr('y1', data[1])
        .attr('x2', data[2])
        .attr('y2', data[3]);
}

function Square(data, container, style) {
    return container.append('rect')
        .datum(style)
        .styles(function(d) { return d; })
        .attr('class', 'square')
        .attr('x', data[0])
        .attr('y', data[1])
        .attr('width', data[2])
        .attr('height', data[2])
        .attr('data-rotation', 0)
        .attr('rx', 0);
}

function Arc(data, container, style) {
    var arc = d3.arc()
        .innerRadius(data[2])
        .outerRadius(data[3])
        .startAngle(45 * (Math.PI / 180))
        .endAngle(10);

    return container.append('g').append('path')
        .datum(style)
        .styles(function(d) { return d; })
        .attr('class', 'arc')
        .attr('d', arc)
        .attr('transform', 'translate(' + data[0] + ',' + data[1] +')');
}

function angleThreePoints(p1, p2, p3) {
    function calc(p1, p2) {
        return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
    }

    var p12 = calc(p1, p2);
    var p13 = calc(p1, p3);
    var p23 = calc(p2, p3);

    var resultRadian = Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13));
    var resultDegree = Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13)) * 180 / Math.PI;

    return {rad: resultRadian, deg: resultDegree};
}

function Angle(data, container, style) {
    var angle = angleThreePoints(data[0], data[1], data[2]);
    var startAngle = angleThreePoints(data[0], {x: data[0].x, y: -data[1].y}, data[1]);

    var angleContainer = container.append('g')
            .attr('transform', 'translate(' + data[0].x + ',' + data[0].y + ')');

    var differenceArc = angleContainer.append('g').datum({});

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(50)
        .startAngle(startAngle.rad)
        .endAngle(startAngle.rad + angle.rad);

    differenceArc.append('path')
        .attr('class', 'difference')
        .style('fill', style.fill)
        .style('fill-opacity', style['opacity'])
        .attr('d', arc());

    differenceArc.append('text')
        .attr('transform', 'translate(' + arc.centroid() + ')')
        .text(Math.round(angle.deg) + 'º');

    return differenceArc;
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Slider = __webpack_require__(1)

module.exports = class Animation {
    static create(obj) {
        var speed = { val: 0.1 }, range = [0.001, 0.51];

        function translateAlong(obj, j) {
            var l = obj.linepath[j].obj.node().getTotalLength();
            return function(d, i, a) {
                return function(t) {
                    t += obj.pauseValues[j].lastTime;
                    var p = obj.linepath[j].obj.node().getPointAtLength(t * l);
                    obj.pauseValues[j].currentTime = t;
                    return 'translate(' + p.x + ',' + p.y + ')';
                };
            };
        }

        function transition(obj, i) {
            var l = obj.linepath[i].obj.node().getTotalLength();
            obj.animated[i].obj.transition()
                .duration(l / speed.val)
                .ease(d3.easeLinear)
                .attrTween('transform', translateAlong(obj, i))
                .on('end', function() {
                    obj.pauseValues[i] = { lastTime: 0, currentTime: 0 };
                });
        }

        d3.select('.inset_content').append('button')
            .attr('class', 'button')
            .style('top', '80px')
            .style('left', '30px')
            .on('click', function() {
                for (var i = 0; i < obj.animated.length; ++i) {
                    obj.animated[i].obj.attr('transform', 'translate(' + 100 + ',' + 100 + ')');
                    obj.animated[i].obj.attr('r', obj.animated[i].obj.attr('r'));
                    obj.pauseValues[i].lastTime = obj.pauseValues[i].currentTime = 0;
                    transition(obj, i);
                }
            })
            .append('text')
                .text('Start');

        d3.select('.inset_content').append('button')
            .attr('class', 'button')
            .style('top', '110px')
            .style('left', '30px')
            .on('click', function(d) {
                var button = d3.select(this);
                if (d3.select('.btext').text() == 'Pause') {
                    d3.select('.btext').text('Resume');
                    for (var i = 0; i < obj.animated.length; ++i) {
                        obj.animated[i].obj.interrupt();
                    }
                    setTimeout(function() { obj.pauseValues[0].lastTime = obj.pauseValues[0].currentTime; }, 100);
                    setTimeout(function() { obj.pauseValues[1].lastTime = obj.pauseValues[1].currentTime; }, 100);
                }
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

        var j = 0;
        d3.select('.inset_content').append('button')
            .attr('class', 'button')
            .style('top', '190px')
            .style('left', '30px')
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

        d3.select('.inset_content').append('button')
            .attr('class', 'button')
            .style('top', '220px')
            .style('left', '30px')
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

        new Slider(95, 0, range, 'speedanim', fun, { speed: speed }, speed.val, ['slower', 'faster'])
    }
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var config = {
    margin: {
        top: 40,
        right: 40,
        bottom: 50,
        left: 40
    },
    width: 960,
    height: 500,
    button: {
        display: 'block',
        position: 'absolute',
        'outline-style': 'none',
        color: '#ededed',
        background: '#CD5C5C',
        height: '25px',
        width: '80px',
        cursor: 'pointer',
        'border-radius': '3px',
        'padding-right': '26px',
        margin: 0,
        padding: '0 12px',
        outline: 'none',
        border: 0
    }
};

module.exports = config;

/***/ })
/******/ ]);
});
//# sourceMappingURL=visualizer.js.map