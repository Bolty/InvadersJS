"use strict";

var INVADERS = INVADERS || {};

INVADERS.alien = function (spec) {

    spec.status = 'alive';

    var that = INVADERS.sprite(spec),
        swoopCount = 0;

    var getDeltaX = function (direction) {
        if (that.swooping) return (Math.sin(swoopCount / 20.0) * 4);
        return direction === "right" ? spec.moveSpeedX : 0 - spec.moveSpeedX;
    };

    that.swooping = false;

    that.move = function (direction) {
        if (that.isInPlay()) {
            if (!that.swooping) {
                
            } else {
                swoopCount++;
            }

            if (that.y > 1000) {
                that.resetY();
            }

            var deltaX = getDeltaX(direction),
                deltaY = that.swooping ? spec.moveSpeedY : 0;

            that.draw(deltaX, deltaY, false);
        }

        return that;
    };

    return that;
};