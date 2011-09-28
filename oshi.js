var Oshi = {
    Piece: function() {
        this.status = null;
        this.power = null;
        this.color = null;
        this.position = {
            x: null,
            y: null
        };
        this.draw = function() {
            Oshi.piece.draw(this.color, this.position.x, this.position.y);
        };
    },
    Player: function() {
        this.status = null;
        this.color = null;
        this.id = null;
        this.position = null;
    },
    init: function() {
        try{
            this.canvas.init();
            this.canvas.clear();
            this.canvas.draw_board();
            this.debug.dummy_join();
            this.game.pieces.generate();
            this.game.pieces.setup();
        } catch(e) {
            $('#errors ul').append($('<li></li>').text(e));
        }
    },
    debug: {
        dummy_join: function() {
            var player_one = new Oshi.Player();
            var player_two = new Oshi.Player();
            player_one.color = 'red';
            player_one.position = 'top';
            player_one.id = 1;
            player_two.color = 'yellow';
            player_one.position = 'bottom';
            player_two.id = 2;
            Oshi.game.players.push(player_one);
            Oshi.game.players.push(player_two);
        }
    },
    player: {
        positions: {
            top: 'top',
            bottom: 'bottom'
        }
    },
    game: {
        available_statuses: ['in_progress', 'open', 'closed', 'dropped'],
        status: null,
        turn_num: null,
        turn: null,
        start_timestamp: null,
        end_timestamp: null,
        players: [],
        min_players: 2,
        max_players: 2,
        pieces: {
            in_game: [],
            generate: function() {
                //test
            },
            setup: function() {
                var player, piece, piece_setup;
                if (this.in_game.length) {
                    throw Oshi.exception_map.pieces_set;
                }
                if (Oshi.game.players.length < Oshi.game.min_players) {
                    throw sprintf(Oshi.exception_map.not_enough_players, Oshi.game.min_players);
                }
                for (player in Oshi.game.players) {
                    if (Oshi.game.players.hasOwnProperty(player)) {
                        for (piece_setup in Oshi.piece.setup[player.position]) {
                            if (Oshi.piece.setup[player.position].hasOwnProperty(piece_setup)) {
                                piece = new Oshi.Piece();
                                piece.status = piece.available_statuses.alive;
                                piece.power = piece_setup.power;
                                piece.color = player.color;
                                piece.position.x = piece_setup.x;
                                piece.position.y = piece_setup.y;
                                piece.draw();
                            }
                        }
                    }
                }
            }
        }
    },
    piece: {
        setup: {
            top: [
                {x: 0, y: 0, power: 1},
                {x: Oshi.piece.width * 8, y: 0, power: 1},
                {x: Oshi.piece.width * 2, y: Oshi.piece.height, power: 1},
                {x: Oshi.piece.width * 3, y: Oshi.piece.height, power: 1},
                {x: Oshi.piece.width * 4, y: Oshi.piece.height, power: 1},
                {x: Oshi.piece.width * 5, y: Oshi.piece.height, power: 1},
                {x: Oshi.piece.width * 6, y: Oshi.piece.height, power: 1},
                {x: Oshi.piece.width * 4, y: Oshi.piece.height*2, power: 1}
            ],
            bottom: [
                {x: 0, y: Oshi.canvas.canvas_height-Oshi.piece.height, power: 1},
                {x: Oshi.canvas.canvas_width - Oshi.piece.width, y: Oshi.canvas.canvas_height-Oshi.piece.height, power: 1},
                {x: Oshi.piece.width * 2, y: Oshi.canvas.canvas_height-Oshi.piece.height*2, power: 1},
                {x: Oshi.piece.width * 3, y: Oshi.canvas.canvas_height-Oshi.piece.height*2, power: 1},
                {x: Oshi.piece.width * 4, y: Oshi.canvas.canvas_height-Oshi.piece.height*2, power: 1},
                {x: Oshi.piece.width * 5, y: Oshi.canvas.canvas_height-Oshi.piece.height*2, power: 1},
                {x: Oshi.piece.width * 6, y: Oshi.canvas.canvas_height-Oshi.piece.height*2, power: 1},
                {x: Oshi.piece.width * 4, y: Oshi.canvas.canvas_height-Oshi.piece.height*3, power: 1}
            ]
        },
        available_statuses: {alive: 'alive', dead: 'dead'},
        width: 44.4,
        height: 44.4,
        images: {
            red:   'http://bit.ly/nHsGEw',
            yellow: 'http://bit.ly/q6mG1U'
        },
        draw: function(color, x, y) {
            Oshi.canvas.canvas_el.drawImage({
                source: this.images[color],
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
            this.load_events();
        },
        load_events: function() {
            /*
            this.canvas_el.click(function(e) {
                var click_coords = Oshi.canvas.get_cursor_coords(e);
            });
            */
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
            var x, y;
            for (x = 0; x <= this.canvas_width; x += Oshi.piece.width) {
                this.canvas_el.drawLine({
                    strokeStyle: "#000",
                    strokeWidth: 1,
                    strokeCap: "round",
                    strokeJoin: "miter",
                    x1: x,  y1: 0,
                    x2: x,  y2: this.canvas_height
                });
            }
            for (y = 0; y <= this.canvas_height; y += Oshi.piece.height) {
                this.canvas_el.drawLine({
                    strokeStyle: "#000",
                    strokeWidth: 1,
                    strokeCap: "round",
                    strokeJoin: "miter",
                    x1: 0,  y1: y,
                    x2: this.canvas_width,  y2: y
                });
            }
        },
        get_cursor_coords: function(e) {
            var x, y;
            if (e.pageX !== undefined && e.pageY !== undefined) {
                x = e.pageX;
                y = e.pageY;
            }
            else {
                x = e.clientX + document.body.scrollLeft +
                                document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop +
                                document.documentElement.scrollTop;
            }
            x -= this.canvas_el.offsetLeft;
            y -= this.canvas_el.offsetTop;
            return [x, y];
        }
    },
    exception_map: {
       pieces_set: "the pieces are already set",
       not_enough_players: "You need at least %d players"
    }
};

$(function(){
   Oshi.init();
});