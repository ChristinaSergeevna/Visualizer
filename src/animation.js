var Slider = require('./Slider.js')

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

        var start = d3.select('.inset_content').append('button')
            .attr('class', 'button')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '80px')
            .style('left', '30px')
            .style('width', '80px')
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

        var pause = d3.select('.inset_content').append('button')
            .attr('class', 'button')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '110px')
            .style('left', '30px')
            .style('width', '80px')
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
    }
}