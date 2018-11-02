var Panel = require('./Panel.js')
var Grid = require('./Grid.js')
var Ruler = require('./Ruler.js')
var Figures = require('./Figures.js')
var Anim = require('./Animation.js')
var Config = require('./Config.js')

export class Visualizer {
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