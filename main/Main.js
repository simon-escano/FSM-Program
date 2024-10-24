import { Game } from "./Game.js";

$(document).ready(function () {
    let game = new Game($("#game")[0], $("canvas")[0], 0.9, 0.55);
    game.start();

    loadCode("main/Player.js");

    $(window).on('resize', () => {
        game.resize();
        resizeCodeMirror(editor);
    });

    $("#Player").click(() => {
        $("#Player_nonFSM").removeClass("border-sky-500").addClass("border-transparent");
        $("#Player").removeClass("border-transparent").addClass("border-sky-500");
        loadCode("main/Player.js");
    });
    $("#Player_nonFSM").click(() => {
        $("#Player").removeClass("border-sky-500").addClass("border-transparent");
        $("#Player_nonFSM").removeClass("border-transparent").addClass("border-sky-500");
        loadCode("main/Player_nonFSM.js");
    });

    $("#sprint-btn").mousedown(() => {
        game.controller.keyDownUp("keydown", 16);
    }).mouseup(() => {
        game.controller.keyDownUp("keyup", 16);
    });

    $("#left-btn").mousedown(() => {
        game.controller.keyDownUp("keydown", 65);
    }).mouseup(() => {
        game.controller.keyDownUp("keyup", 65);
    });

    $("#right-btn").mousedown(() => {
        game.controller.keyDownUp("keydown", 68);
    }).mouseup(() => {
        game.controller.keyDownUp("keyup", 68);
    });

    $("#jump-btn").mousedown(() => {
        game.controller.keyDownUp("keydown", 32);
    }).mouseup(() => {
        game.controller.keyDownUp("keyup", 32); 
    });
});

function resizeCodeMirror(editor) {
    $(".CodeMirror").css("height", `${$("#editor-container").height() - $("#editor-header").height()}px`);
    editor.refresh();
}

function loadCode(filename) {
    fetch(filename)
    .then(response => response.text())
    .then(text => {
        document.getElementById("editor").innerHTML = "";
        const editor = CodeMirror(document.getElementById("editor"), {
            value: text,
            lineNumbers: true,
            mode: "javascript",
            theme: "seti",
            lineWrapping: true,
            readOnly: true,
        });
        resizeCodeMirror(editor);
    })
    .catch(error => {
        console.error(`Error fetching ${ filename }:`, error);
    });
}