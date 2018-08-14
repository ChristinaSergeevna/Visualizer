module.exports = {    
    buttonStyle(button) {
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
}