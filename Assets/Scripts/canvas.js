"use strict";

var INVADERS = INVADERS || {};

INVADERS.canvas = function () {

    var that = this,
        canvasSize = 1000,
        canvasElement = document.getElementById("game-canvas"),
        canvasCtx = canvasElement.getContext("2d"),
        imageMultiply = canvasSize / canvasElement.width;

    canvasCtx.canvas.width = canvasSize;
    canvasCtx.canvas.height = canvasSize;

    var draw = function (img, x, y) {
        canvasCtx.drawImage(img, x, y, img.width * imageMultiply, img.height * imageMultiply);
        return that;
    };

    var clear = function (img, x, y) {
        canvasCtx.clearRect(x, y, img.width * imageMultiply, img.height * imageMultiply);
        return that;
    };

    var isOnCanvas = function (img, x, y) {
        var imageRectExtentX = (img.width * imageMultiply) + x,
            imageRectExtentY = (img.height * imageMultiply) + y;

        return x > 0 && imageRectExtentX < canvasCtx.canvas.width 
            && y > 0 && imageRectExtentY < canvasCtx.canvas.height;
    };

    return {
        draw: draw,
        clear: clear,
        isOnCanvas: isOnCanvas
    };
};