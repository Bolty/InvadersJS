"use strict";

var INVADERS = INVADERS || {};

INVADERS.bullets = function (spec) {

    var shipBulletSpeed = 10,
        alienBulletSpeed = 7;

    var that = {
        shipBullets: [],
        alienBullets: []
    };

    that.fire = function (actions, ship) {
        if (ship.isAlive() && actions.fire) {
            that.shipBullets.push(INVADERS.bullet({
                canvas: spec.canvas,
                image: spec.image,
                x: ship.getX(),
                y: ship.getY()
            }));

            actions.fire = false;
        }

        return that;
    };

    that.move = function () {
        that.draw();
        return that;
    };

    that.draw = function () {
        for (var i = 0; i < that.shipBullets.length; i++) {
            that.shipBullets[i].draw(0, -shipBulletSpeed);
        }

        for (var i = 0; i < that.alienBullets.length; i++) {
           // that.alienBullets[i].draw(?);
        }

        return that;
    };

    return that;
};