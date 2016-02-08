"use strict";

var INVADERS = INVADERS || {};

INVADERS.controller = function () {

    var that = this;

    var gameLoop = function () {
        that.canvas.clearCanvas();
        that.stars.draw();
        that.ship.move(that.actions);
        that.bullets.shipFire(that.actions, that.ship).move();
        that.alienFleet.move();
        that.bullets.alienFire(that.alienFleet.fireNow(), that.alienFleet.getRandomAlien()).move();
        that.scoreBoard.update(that.bullets.detectAlienShot(that.alienFleet.fleet));

        if (that.shipIsDead) {
            that.shipIsDeadCountDown--;
            if (that.shipIsDeadCountDown < 0) {
                startGame();
                return;
            }
        } else {
            var shipHasCrashed = that.ship.detectCrash(that.alienFleet.fleet),
                shipHasBeenShot = that.bullets.detectShipShot(that.ship),
                sheetComplete = that.alienFleet.fleet.length === 0;

            if (shipHasCrashed || shipHasBeenShot) {
                that.shipIsDead = true;
            } else {
                if (sheetComplete) that.alienFleet.newSheet();
            }
        }

        window.requestAnimationFrame(gameLoop);
    };

    var initSheet = function (images) {

        var exp1 = images.Explosion1,
            exp2 = images.Explosion2,
            exp3 = images.Explosion3,
            explosionSequence = [exp1, exp2, exp3, exp1, exp2, exp3, exp1, exp2, exp3, exp1, exp2, exp3, exp1, exp2, exp3];

        that.stars = INVADERS.stars({
            canvas: that.canvas,
            image: images.Star,
        }).draw();

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

        that.shipIsDead = false;
        that.shipIsDeadCountDown = 300;
    };

    var startGame = function () {
        initSheet(INVADERS.services.imageService.images);
        gameLoop();
    };

    var init = function () {
        INVADERS.services.inputService.init();
        that.actions = INVADERS.services.inputService.actions;
        that.canvas = INVADERS.canvas();
        startGame();
    };

    return {
        init: init
    }
};

window.onload = function () {
    var controller = new INVADERS.controller();
    INVADERS.services.imageService.getImages(controller.init);
};