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
                x: ship.x,
                y: ship.y
            }));

            actions.fire = false;
        }

        return that;
    };

    that.move = function () {
        that.shipBullets = INVADERS.services.arrayService.filter(that.shipBullets, 'y', 0, '>');
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

    that.detectAlienShot = function (aliens) {
        var killed = 0;

        for (var i = 0; i < that.shipBullets.length; i++) {
            var bullet = that.shipBullets[i];
            var shot = bullet.isColliding(aliens);
            if (shot != null) {
                bullet.y = 0; // Will be removed on next draw
                shot.sprite.kill();
                killed++;
            }
        }

        return killed;
    };

    return that;
};