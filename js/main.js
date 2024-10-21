$(window).on("load", function() {
    "use strict";

    var keyDownUp = function(event) {
        controller.keyDownUp(event.type, event.keyCode);
    };

    var resize = function(event) {
        display.resize();
        display.render();
    };

    var render = function() {
        display.drawMap(game.world.map, game.world.columns);
        display.drawPlayer(game.world.player, game.world.player.image);
        display.render();
    };

    var update = function() {
        if (controller.a.active) { game.world.player.moveLeft(); }
        if (controller.d.active) { game.world.player.moveRight(); }
        if (controller.space.active) { game.world.player.jump(); controller.space.active = false; }
        if (controller.shift.active) { 
            game.world.player.sprint(); 
        } else {
            game.world.player.sprinting = false;
        }
        game.update();
    };

    var controller = new Controller();
    var display = new Display($("canvas")[0]);
    var game = new Game();
    var engine = new Engine(1000 / 60, render, update);

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    $(display.tile_sheet.image).one("load", function() {
        resize();
        engine.start();
    });

    display.tile_sheet.image.src = "/img/spritesheet.png";

    $(window).on("keydown keyup", keyDownUp);
    // $(window).on("resize", resize);
});
