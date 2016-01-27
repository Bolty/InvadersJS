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
    canvasCtx.fillStyle = "white";
    canvasCtx.font = (10 * imageMultiply) + 'px sans-serif';

    var writeText = function (text, x, y) {
        canvasCtx.fillText(text, x, y);
    };

    var draw = function (img, x, y) {
        if (img) {
            canvasCtx.drawImage(img, x, y, img.width * imageMultiply, img.height * imageMultiply);
        }

        return that;
    };

    var isOnCanvas = function (img, x, y) {
        if (img === null) return false;

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

        var sp1Left = sp1.x,
               sp1Top = sp1.y,
               sp1Right = sp1Left + getSpriteWidth(sp1),
               sp1Bottom = sp1Top + getSpriteHeight(sp1);

        for (var i = 0; i < spriteCollection.length; i++) {
            var sp2 = spriteCollection[i],
                sp2Left = sp2.x,
                sp2Top = sp2.y,
                sp2Right = sp2Left + getSpriteWidth(sp2),
                sp2Bottom = sp2Top + getSpriteHeight(sp2);

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

    var getSpriteHeight = function (sprite) {
        return sprite.imageHeight * imageMultiply;
    };

    var getSpriteWidth = function (sprite) {
        return sprite.imageWidth * imageMultiply;
    };

    return {
        draw: draw,
        clearCanvas: clearCanvas,
        isOnCanvas: isOnCanvas,
        spriteCollision: spriteCollision,
        getSpriteHeight: getSpriteHeight,
        getSpriteWidth: getSpriteWidth,
        writeText: writeText
    };
};