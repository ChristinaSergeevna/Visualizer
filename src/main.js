var Panel = require('./Panel.js')
var Grid = require('./Grid.js')
var Ruler = require('./Ruler.js')
var Figures = require('./Figures.js')
var Anim = require('./Animation.js')

export class Visualizer {
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