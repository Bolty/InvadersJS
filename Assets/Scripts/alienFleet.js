"use strict";

var INVADERS = INVADERS || {};

INVADERS.alienFleet = function (spec) {

    var getFleet = function () {

        var aliens = [],
            rows = 5,
            columns = 8;

        for (var row = 0; row < rows; row++) {
            for (var column = 0; column < columns; column++) {
                aliens.push(INVADERS.alien({
                    canvas: spec.canvas,
                    image: spec.image,
                    explodeImages: spec.explodeImages,
                    x: column * 70,
                    y: row * 70,
                    moveSpeedX : 2,
                    moveSpeedY : 6
                }));
            }
        }

        return aliens;
    };

    var that = {
        fleet: getFleet(),
        moving: "right",
        swoopChancePercent: 0.5,
        fireChancePercent: 2
    };

    that.newSheet = function () {
        that.fleet = getFleet();
        that.swoopChancePercent = that.swoopChancePercent + 0.5;
        that.fireChancePercent++;
    };

    that.move = function () {

        that.fleet = INVADERS.services.arrayService.filter(that.fleet, 'isInPlay', true, '==');

        if ((Math.random() * 100) < that.swoopChancePercent) {
            var alien = that.getRandomAlien();
            if (!alien.swooping && alien.isAlive()) alien.swooping = true;
            that.fleet.swooping = true;
        }

        // Check for change in direction of fleet
        for (var i = 0; i < that.fleet.length; i++) {
            var alien = that.fleet[i];

            if (!alien.swooping && !spec.canvas.isOnCanvas(spec.image, alien.x, 0)) {
                that.moving = that.moving === "left" ? "right" : "left";
                break;
            }
        }

        for (var i = 0; i < that.fleet.length; i++) {
            that.fleet[i].move(that.moving);
        }

        return that;
    };

    that.getRandomAlien = function () {
        var index = Math.floor(Math.random() * that.fleet.length);
        return that.fleet[index];
    };

    that.fireNow = function () {
        return (Math.random() * 100) < that.fireChancePercent;
    }

    return that;
};