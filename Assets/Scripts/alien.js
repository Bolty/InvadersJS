"use strict";

var INVADERS = INVADERS || {};

INVADERS.alien = function (spec) {

    spec.swooping = false;

    var that = INVADERS.sprite(spec);

    that.move = function (direction) {

        if (!spec.swooping) {
            if ((Math.random() * 100) < spec.swoopChancePercent)  spec.swooping = true;
        }

        var deltaX = direction === "right" ? spec.moveSpeedX : 0 - spec.moveSpeedX,
            deltaY = spec.swooping ? spec.moveSpeedY : 0; 
        ;
        that.draw(deltaX, deltaY, false);
        return that;
    };

    return that;
};