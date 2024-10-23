import { Game } from "./Game.js";

$(document).ready(function () {
    let game = new Game($("#game")[0], $("canvas")[0], 0.9, 0.9);
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