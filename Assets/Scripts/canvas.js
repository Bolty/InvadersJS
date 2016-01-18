var INVADERS = INVADERS || {};

INVADERS.canvas = function () {

    var canvasElement = document.getElementById("game-canvas");
    var canvasCtx = canvasElement.getContext("2d");

    var draw = function (img, x, y) {
        canvasCtx.drawImage(img, x, y);
    };

    return {
        draw : draw
    };
};