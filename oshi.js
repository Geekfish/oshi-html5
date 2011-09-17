
var Oshi = {
    init: function() {
        this.canvas.init();
        this.canvas.clear();
        this.canvas.draw_board();
    },
    piece: {
        width: 44.4,
        height: 44.4,
        red_image: 'images/red.jpg',
        yellow_image: 'images/yellow.jpg'
    },
    canvas: {
        canvas_width: 400,
        canvas_height: 400,
        canvas_el: null,
        context: null,
        init: function() {
            this.create();
            this.load_context();
        },
        create: function() {
            this.canvas_el = $('<canvas></canvas>').attr('id', 'oshi_canvas');
            this.canvas_el.attr('width', this.canvas_width)
                          .attr('height', this.canvas_height);
            $('body').append(this.canvas_el);
        },
        load_context: function() {
            this.context = this.canvas_el.loadCanvas("2d");
        },
        clear: function() {
            this.canvas_el.clearCanvas();
        },
        draw_board: function() {
            for (var x = 0; x <= this.canvas_width; x += Oshi.piece.width) {
                this.canvas_el.drawLine({
                    strokeStyle: "#000",
                    strokeWidth: 1,
                    strokeCap: "round",
                    strokeJoin: "miter",
                    x1: x,  y1: 0,
                    x2: x,  y2: this.canvas_height
                });
            }
            for (var y = 0; y <= this.canvas_height; y += Oshi.piece.height) {
                this.canvas_el.drawLine({
                    strokeStyle: "#000",
                    strokeWidth: 1,
                    strokeCap: "round",
                    strokeJoin: "miter",
                    x1: 0,  y1: y,
                    x2: this.canvas_width,  y2: y
                });
            }
        }
    }
};

$(function(){
   Oshi.init(); 
});