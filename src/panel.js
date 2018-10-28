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
<<<<<<< HEAD
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
=======
>>>>>>> cc772097ff407809e39c70d18355a17e9974c74a
}