var animated = [], dataAnim = [], dataPath = [], dataCircles = [], linepath, 
    pauseValues = { lastTime: 0, currentTime: 0 };
var deleteItems = [], items = [], selected = [];

///////////////////////////////////////// animation /////////////////////////////////////////////////

function transition(circle, i) {
    circle.transition()
        .duration(dataAnim[i].duration - (dataAnim[i].duration * pauseValues.lastTime))
        .attr('r', dataAnim[i].r)
        .attrTween("transform", translateAlong(linepath.node()))
        .each("end", function() {
            pauseValues = { lastTime: 0, currentTime: 0 };
            transition(circle);
        });
}

function translateAlong(path) {
    var l = path.getTotalLength();
    return function(d, i, a) {
        return function(t) {
            t += pauseValues.lastTime;
            var p = path.getPointAtLength(t * l);
            pauseValues.currentTime = t;
            return "translate(" + p.x + "," + p.y + ")";
        };
    };
}

function animatedCircle(container, data, points, anim, style = circleStyle) {
    var circle = container.append('circle')
        .style('stroke', style.clr)
        .style('stroke-width', style.lwidth) 
        .attr('fill', style.clrf)
        .attr('class', 'animatedCircle')
        .attr('r', data.size);
    dataPath = points;
    linepath = addPath(container, dataPath);
    circle.transition()
        .attr("transform", "translate(" + (dataPath[0]) + ")");
    dataCircles.push(data);
    dataAnim.push(anim);
    animated.push(circle);
    return circle;
}

var start = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '20px')
        .style('left', '150px')
        .append("input")
            .datum({})
            .attr("type", "button")
            .attr('value', 'Start')
            .style('width', '80px')
            .on("click", function() {
                for (var i = 0; i < animated.length; i++) {
                    animated[i].attr("transform", "translate(" + (dataPath[0]) + ")");
                    animated[i].attr('r', dataCircles[i].size)
                    pauseValues.lastTime = pauseValues.currentTime = 0;
                    transition(animated[i], i);
                }
            });         

var pause = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '50px')
        .style('left', '150px')
        .append("input")
            .datum({})
            .attr("type", "button")
            .attr('value', 'Pause')
            .style('width', '80px')
            .on("click", function(d, i) {
                var button = d3.select(this);
                if (button.attr('value') == 'Pause') {
                    button.attr("value", 'Resume');
                    for (var i = 0; i < animated.length; i++) {
                        animated[i].transition()
                            .duration(0);
                    }
                    setTimeout(function() {
                            pauseValues.lastTime = pauseValues.currentTime;
                        }, 100);
                } 
                else {
                    button.attr("value", 'Pause');
                    for (var i = 0; i < animated.length; i++) {
                        transition(animated[i], i);
                    }
                }
            });

/////////////////////////////////////////////////////////////////////////////////////////

function selectItem(d) {
    for (var i = 0; i < selected.length; ++i) {
        if (selected[i] == this) {
            var el = d3.select(this);
            selected.splice(i, 1);
            el
                .style('stroke-width', 'none')
                .style('stroke', 'none');
            return;
        }
    }
    selected.push(this);
    var el = d3.select(this);
    el
        .style('stroke-width', 2)
        .style('stroke', 'black');
}

function zoomItem(k) {
    for (var i = 0; i < selected.length; i++) {
        var el = d3.select(selected[i]);
        if (el.attr('class') == 'selectSquare') {
            var w = +el.attr('width'), h = +el.attr('height');
            var x = +el.attr('x'), y = +el.attr('y');
            el.attr('width', w + k).attr('height', h + k);
            // el.attr('x', x - k / 2); el.attr('y', y - k / 2);
        }
        else if (el.attr('class') == 'selectCircle') {
            var r = +el.attr('r');
            el.attr('r', r + k);
        }
    }
}

function getItem(container, d) {
    var item = d.obj.attr('class');
    switch (item) {
        case 'selectSquare':
            return addSquare(container, d.data);
        case 'selectCircle':
            return addCircle(container, d.data);
        case 'selectArc':
            return addArc(container, d.data);
        case 'line':
            return addLine(container, d.data);
        case 'point':
            return intersectionPoint(container, d.data);
        case 'path':
            return addPath(container, d.data);
        default:
            break;
    }
}

var addItem = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '90px')
        .style('left', '45px')
        .append("input")
            .datum({})
            .attr("type", "button")
            .attr('value', 'Add')
            .style('width', '80px')
            .on("click", function() {
                items.push(getItem(itemContainer, deleteItems.pop()));
            });

var deleteItem = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '120px')
        .style('left', '45px')
        .append("input")
            .datum({})
            .attr("type", "button")
            .attr('value', 'Delete')
            .style('width', '80px')
            .on("click", function() {
                deleteItems.push({ data: pointsItems[items.length], obj: items.pop().remove()});
            });

var zoomInItem = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '150px')
        .style('left', '70px')
        .append("input")
            .datum({})
            .attr("type", "button")
            .attr('value', '+')
            .style('width', '30px')
            .on("click", function() {
                zoomItem(10);
            });

var zoomOutItem = d3.select("body").append("p")
        .style('display', 'block')
        .style('position', 'absolute')
        .style('top', '180px')
        .style('left', '70px')
        .append("input")
            .datum({})
            .attr("type", "button")
            .attr('value', '-')
            .style('width', '30px')
            .on("click", function() {
                zoomItem(-10);
            });

buttonStyle(start);   
buttonStyle(pause); 
buttonStyle(addItem);
buttonStyle(deleteItem);
buttonStyle(zoomInItem);
buttonStyle(zoomOutItem);