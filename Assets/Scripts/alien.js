"use strict";

var INVADERS = INVADERS || {};

INVADERS.alien = function (spec) {

    var that = INVADERS.sprite(spec),
        swooping = false,
        swoopCount = 0;

    var getDeltaX = function (direction) {
        if (swooping) return Math.sin(swoopCount / 20.0);
        return direction === "right" ? spec.moveSpeedX : 0 - spec.moveSpeedX;
    };

    that.move = function (direction) {

        if (!swooping) {
            if ((Math.random() * 100) < spec.swoopChancePercent)  swooping = true;
        } else {
            swoopCount++;
        }

        if (that.getY() > 1000) {
            that.resetY();
        }

        var deltaX = getDeltaX(direction),
            deltaY = swooping ? spec.moveSpeedY : 0;

        that.draw(deltaX, deltaY, false);
        return that;
    };

    that.isSwooping = function () {
        return swooping;
    }

    return that;
};