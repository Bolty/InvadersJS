"use strict";

var INVADERS = INVADERS || {};

INVADERS.scoreBoard = function (spec) {

    var that = {
        score: 0
    };

    that.update = function (extraScore) {
        that.score += extraScore;
        spec.canvas.writeText(that.score, 0, 0);
    };

    return that;
};