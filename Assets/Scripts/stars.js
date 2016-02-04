"use strict";

var INVADERS = INVADERS || {};

INVADERS.star = function (spec) {
    var that = INVADERS.sprite(spec);
    return that;
};

INVADERS.stars = function (spec) {

    var starSpeed = 1,
        starCount = 30;

    var that = {
        collection: []
    };

    var initStars = function () {
        for (var i = 0; i < starCount; i++) {
            that.collection.push(INVADERS.star({
                canvas: spec.canvas,
                image: spec.image,
                x: (Math.random() * 1000),
                y: (Math.random() * 1000)
            }));
        }
    }

    that.draw = function () {
        for (var i = 0; i < that.collection.length; i++) {
            if (that.collection[i].y > 1000) that.collection[i].y = 0;
            that.collection[i].draw(0, starSpeed);
        }

        return that;
    };

    initStars();

    return that;
};