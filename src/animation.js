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
                };
            };
        }

        function transition(obj, i) {
            obj.animated[i].transition()
                .duration(obj.dataAnim[i].duration - (obj.dataAnim[i].duration * obj.pauseValues[i].lastTime))
                // .attr('r', obj.dataAnim[i].r)
                .attrTween("transform", translateAlong(obj, i))
                .on("end", function() {
                    obj.pauseValues[i] = { lastTime: 0, currentTime: 0 };
                });
        }

        var start = d3.select(".inset_content").append("button")
            .attr('class', 'button')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '80px')
            .style('left', '30px')
            .style('width', '80px')
            .on("click", function() {
                for (var i = 0; i < obj.animated.length; ++i) {
                    obj.animated[i].attr("transform", "translate(" + 100 + "," + 100 + ")");
                    obj.animated[i].attr('r', obj.animated[i].attr('r'));
                    obj.pauseValues[i].lastTime = obj.pauseValues[i].currentTime = 0;
                    transition(obj, i);
                }
            })
            .append('text')
                .text('Start');         
    
        var pause = d3.select(".inset_content").append("button")
            .attr('class', 'button')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', '110px')
            .style('left', '30px')
            .style('width', '80px')
            .on("click", function(d) {
                var button = d3.select(this);
                if (d3.select('.btext').text() == 'Pause') {
                    d3.select('.btext').text('Resume');
                    for (var i = 0; i < obj.animated.length; ++i) {
                        obj.animated[i].transition().duration(0);
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
    }
}