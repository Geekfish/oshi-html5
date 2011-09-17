
var Oshi = {
    init: function() {
        this.canvas.init();
        this.canvas.clear();
        this.canvas.draw_board();
    },
    piece: {
        width: 44.4,
        height: 44.4,
        red_image: 'http://www.useful-free-stuff.com/Data/icons/simple-red-square-icon-symbols-shapes-full-set/simple-red-square-icon-symbols-shapes-shape-square-frame.png',
        yellow_image: 'http://www.snowmobilestud.com/shop/store/20100910001/items/thumbnails/yellow-square-aluminum-backer.jpg',
        draw: function(color, x, y) {
            Oshi.canvas.canvas_el.drawImage({
                source: this[color+'_image'],
                x: x + this.width / 2,
                y: y + this.height / 2,
                width: this.width - 2,
                height: this.height - 2
            });
        }
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
            
            Oshi.piece.draw('red', 0, 0);
            Oshi.piece.draw('red', Oshi.piece.width * 8, 0);
            
            Oshi.piece.draw('red', Oshi.piece.width * 2, Oshi.piece.height*1);
            Oshi.piece.draw('red', Oshi.piece.width * 3, Oshi.piece.height*1);
            Oshi.piece.draw('red', Oshi.piece.width * 4, Oshi.piece.height*1);
            Oshi.piece.draw('red', Oshi.piece.width * 5, Oshi.piece.height*1);
            Oshi.piece.draw('red', Oshi.piece.width * 6, Oshi.piece.height*1);
            
            Oshi.piece.draw('red', Oshi.piece.width * 4, Oshi.piece.height*2);
            
            
            Oshi.piece.draw('yellow', 0, this.canvas_height-Oshi.piece.height);
            Oshi.piece.draw('yellow', this.canvas_width - Oshi.piece.width,  this.canvas_height-Oshi.piece.height*1);
            
            Oshi.piece.draw('yellow', Oshi.piece.width * 2, this.canvas_height-Oshi.piece.height*2);
            Oshi.piece.draw('yellow', Oshi.piece.width * 3, this.canvas_height-Oshi.piece.height*2);
            Oshi.piece.draw('yellow', Oshi.piece.width * 4, this.canvas_height-Oshi.piece.height*2);
            Oshi.piece.draw('yellow', Oshi.piece.width * 5, this.canvas_height-Oshi.piece.height*2);
            Oshi.piece.draw('yellow', Oshi.piece.width * 6, this.canvas_height-Oshi.piece.height*2);
            
            Oshi.piece.draw('yellow', Oshi.piece.width * 4, this.canvas_height-Oshi.piece.height*3);
        }
    }
};

$(function(){
   Oshi.init(); 
});