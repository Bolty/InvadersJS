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

    var isOnCanvas = function (img, x, y) {
        var imageRectExtentX = (img.width * imageMultiply) + x,
            imageRectExtentY = (img.height * imageMultiply) + y;

        return x >= 0 && imageRectExtentX <= canvasCtx.canvas.width 
            && y >= 0 && imageRectExtentY <= canvasCtx.canvas.height;
    };

    var clearCanvas = function () {
        canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
        return that;
    };

    var spriteCollision = function (sp1, spriteCollection) {

        var sp1Left = sp1.getX(),
               sp1Top = sp1.getY(),
               sp1Right = sp1Left + (sp1.getWidth() * imageMultiply),
               sp1Bottom = sp1Top + (sp1.getHeight() * imageMultiply);

        for (var i = 0; i < spriteCollection.length; i++) {
            var sp2 = spriteCollection[i],
                sp2Left = sp2.getX(),
                sp2Top = sp2.getY(),
                sp2Right = sp2Left + (sp2.getWidth() * imageMultiply),
                sp2Bottom = sp2Top + (sp2.getHeight() * imageMultiply);

            var xPos = Math.max(sp1Left, sp2Left),
                num1 = Math.min(sp1Right, sp2Right),
                yPos = Math.max(sp1Top, sp2Top),
                num2 = Math.min(sp1Bottom, sp2Bottom);
            if (num1 >= xPos && num2 >= yPos)
                return {
                    index: i,
                    sprite: sp2
                };
        }

        return null;
    };

    return {
        draw: draw,
        clearCanvas: clearCanvas,
        isOnCanvas: isOnCanvas,
        spriteCollision: spriteCollision
    };
};