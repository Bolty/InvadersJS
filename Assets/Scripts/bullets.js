"use strict";

var INVADERS = INVADERS || {};

INVADERS.bullet = function (spec) {
    var that = INVADERS.sprite(spec);
    return that;
};

INVADERS.bullets = function (spec) {

    var shipBulletSpeed = 10,
        alienBulletSpeed = 5,
        maxShipBullets = 3,
        maxAlienBullets = 5;

    var that = {
        shipBullets: [],
        alienBullets: []
    };

    var addBullet = function (sprite, collection, yOffset) {
        collection.push(INVADERS.bullet({
            canvas: spec.canvas,
            image: spec.image,
            x: sprite.x + (spec.canvas.getSpriteWidth(sprite) / 2),
            y: sprite.y + yOffset
        }));
    }

    that.shipFire = function (actions, ship) {
        if (ship.isAlive() && actions.fire && that.shipBullets.length < maxShipBullets) {
            addBullet(ship, that.shipBullets, 0);
            actions.fire = false;
        }

        return that;
    };

    that.alienFire = function (fireNow, alien) {
        if (fireNow && that.alienBullets.length < maxAlienBullets) {
            addBullet(alien, that.alienBullets, spec.canvas.getSpriteHeight(alien));
        }

        return that;
    };

    that.move = function () {
        that.shipBullets = INVADERS.services.arrayService.filter(that.shipBullets, 'y', 0, '>');
        that.alienBullets = INVADERS.services.arrayService.filter(that.alienBullets, 'y', 1000, '<');
        that.draw();
        return that;
    };

    that.draw = function () {
        for (var i = 0; i < that.shipBullets.length; i++) {
            that.shipBullets[i].draw(0, -shipBulletSpeed);
        }

        for (var i = 0; i < that.alienBullets.length; i++) {
            that.alienBullets[i].draw(0, alienBulletSpeed);
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

    that.detectShipShot = function (ship) {
        for (var i = 0; i < that.alienBullets.length; i++) {
            var bullet = that.alienBullets[i];
            var shot = bullet.isColliding([ship]);
            if (shot != null) {
                bullet.y = 0; // Will be removed on next draw
                shot.sprite.kill();
            }
        }
    }

    return that;
};