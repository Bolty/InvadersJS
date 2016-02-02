"use strict";

var INVADERS = INVADERS || {};

INVADERS.controller = function () {

    var that = this;

    var gameLoop = function () {
        that.canvas.clearCanvas();
        that.ship.move(that.actions);
        that.bullets.fire(that.actions, that.ship).move();
        that.alienFleet.move();

        var shipHasCrashed = that.ship.detectCrash(that.alienFleet.fleet);
        var aliensShotCount = that.bullets.detectAlienShot(that.alienFleet.fleet);
        var sheetComplete = that.alienFleet.fleet.length === 0;

        that.scoreBoard.update(aliensShotCount);
        if (sheetComplete) that.alienFleet.newSheet();

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
            image: images.AlienA,
            explodeImages: explosionSequence
        });

        that.bullets = INVADERS.bullets({
            canvas: that.canvas,
            image: images.Bullet,
        });

        that.scoreBoard = INVADERS.scoreBoard({
            canvas: that.canvas
        });
    };

    var startGame = function () {
        INVADERS.services.inputService.init();

        that.actions = INVADERS.services.inputService.actions;
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