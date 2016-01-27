"use strict";

var INVADERS = INVADERS || {};

INVADERS.controller = function () {

    var that = this;

    var gameLoop = function () {
        that.canvas.clearCanvas();
        that.ship.move(that.actions);
        that.bullets.fire(that.actions, that.ship).move();
        that.alienFleet.move();

        var shipCollision = that.canvas.spriteCollision(that.ship, that.alienFleet.fleet);
        if (shipCollision) {
            that.ship.kill()
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

    var initSheet = function (images) {

        var exp1 = images.Explosion1,
            exp2 = images.Explosion2,
            exp3 = images.Explosion3,
            explosionSequence = [exp1, exp2, exp3, exp1, exp2, exp3, exp1, exp2, exp3, exp1, exp2, exp3, exp1, exp2, exp3];

        that.ship = INVADERS.ship({
            canvas: that.canvas,
            image: images.Ship,
            explodeImages: explosionSequence
        }).draw();

        that.alienFleet = INVADERS.alienFleet({
            canvas: that.canvas,
            image: images.AlienA
        });

        that.bullets = INVADERS.bullets({
            canvas: that.canvas,
            image: images.Bullet,
        });
    };

    var startGame = function () {
        INVADERS.services.keyboardService.init();

        that.actions = INVADERS.services.keyboardService.actions;
        that.canvas = INVADERS.canvas();
        initSheet(INVADERS.services.imageService.images);
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