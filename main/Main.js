import { Game } from "./Game.js";

$(document).ready(function () {
    let game = new Game($("#game")[0], $("canvas")[0], 0.9, 0.9);
    game.start();

    $(window).on("resize", function () {
        game.resize();
    });
});