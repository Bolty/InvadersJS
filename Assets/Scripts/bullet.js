"use strict";

var INVADERS = INVADERS || {};

INVADERS.bullet = function (spec) {

    var that = INVADERS.sprite(spec);

    that.move = function (direction) {
        return that;
    };

    return that;
};