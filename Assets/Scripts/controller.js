"use strict";

var INVADERS = INVADERS || {};

INVADERS.controller = function () {

    var that = this;

    var gameLoop = function () {
        that.canvas.clearCanvas();
        that.ship.move(that.actions);
        that.alienFleet.move();

        var shipCollision = that.canvas.spriteCollision(that.ship, that.alienFleet.fleet);
        if (shipCollision) {
            var x = true;
        }
        //handleBullits();
        //handleAliens();
        //handleBombs();
        //checkForScreenComplete();

        //if (!gameInPlay) {
        //    clearScreen();
        //    prepareForScreen(screen);
        //    gameInPlay = true;
        //}
        window.requestAnimationFrame(gameLoop);
    };

    var initSheet = function () {
        that.ship = INVADERS.ship({
            canvas: that.canvas,
            image: that.images.Ship
        }).draw();

        that.alienFleet = INVADERS.alienFleet({
            canvas: that.canvas,
            image: that.images.AlienA
        }).draw();
    };

    var startGame = function (images) {
        INVADERS.services.keyboardService.init();

        that.actions = INVADERS.services.keyboardService.actions;
        that.images = images;
        that.canvas = INVADERS.canvas();
        initSheet();
        gameLoop();
    };

    return {
        startGame: startGame
    }
};

window.onload = function () {
    var controller = INVADERS.controller();
    INVADERS.services.imageService.getImages(controller.startGame);
};