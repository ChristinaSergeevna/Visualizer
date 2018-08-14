var Grid = require('./Grid.js')
var Figures = require('./Figures.js')
//var Ruler = require('./Ruler.js')

export class Visualizer {
    static SVG(data) {
        var svg = d3.select("body").append('svg')
                .attr('width', '100%')
                .attr('height', '100vh')
                .attr('display', 'block')

        var width = document.body.clientWidth;
        var height = document.body.clientHeight;

        // var d = document.createElement('DIV');
        // svg.appendChild(d);

        for (var i = 0; i < data.length; ++i)
        {
            //data[i].input = this.parseInput(data[i].input);
            //data[i].output = this.parseOutput(data[i].output);

            //alert(data[i].input);
        }

        this.canvas(svg, width, height, data);
        // return svg; 
    }

    static canvas(svg, width, height, data) {
        var view = svg.append("g")
            .style('margin', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '12px')
            .attr("class", "view");

        var grid = new Grid(svg, view, width, height);
        var items = new Figures(view, grid, data, width, height);
        // var ruler = new Ruler(view, grid, width, height); 
    }

    static parseInput(input) {
        var buff = input.trim().split(/\s+/);
        for (var i = 0; i < buff.length; ++i)
            buff[i] = parseFloat(buff[i]);
        return buff;
        // var n = buff[0];
        // var p = [];
        // for (var i = 0; i < n; ++i)
        //     p[i] = { x: buff[2 * i + 1], y: buff[2 * i + 2] };
        // return { n: n, p: p };
    }

    static parseOutput(input) {
        var buff = input.trim().split(/\s+/);
        for (var i = 0; i < buff.length; ++i)
            buff[i] = parseFloat(buff[i]);
        return buff;
    }
}