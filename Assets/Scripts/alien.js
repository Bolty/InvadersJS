"use strict";

var INVADERS = INVADERS || {};

INVADERS.alien = function (spec) {

    var that = INVADERS.sprite(spec),
        swooping = false;

    that.move = function (direction) {

        if (!swooping) {
            if ((Math.random() * 100) < spec.swoopChancePercent)  swooping = true;
        }

        if (that.getY() > 1000) {
            that.resetY();
        }

        var deltaX = direction === "right" ? spec.moveSpeedX : 0 - spec.moveSpeedX,
            deltaY = swooping ? spec.moveSpeedY : 0; 

        that.draw(deltaX, deltaY, false);
        return that;
    };

    return that;
};