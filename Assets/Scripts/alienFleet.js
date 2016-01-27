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
                    x: column * 70,
                    y: row * 70,
                    swoopChancePercent : 0.05,
                    moveSpeedX : 2,
                    moveSpeedY : 4
                }));
            }
        }

        return aliens;
    };

    var that = {
        fleet: getFleet(),
        moving: "right"
    };

    that.move = function () {

        // Check for change in direction of fleet
        for (var i = 0; i < that.fleet.length; i++) {
            var alien = that.fleet[i];

            if (!alien.isSwooping() && !spec.canvas.isOnCanvas(spec.image, alien.getX(), 0)) {
                that.moving = that.moving === "left" ? "right" : "left";
                break;
            }
        }

        for (var i = 0; i < that.fleet.length; i++) {
            that.fleet[i].move(that.moving);
        }

        return that;
    };

    return that;
};