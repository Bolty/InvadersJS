var INVADERS = INVADERS || {};

INVADERS.ship = function (canvas, image) {

    var that = {}; // Will do inheritance here shortly

    var startX = 50;
    var startY = 80;

    that.draw = function () {
        canvas.draw(image, startX, startY);
    }

    return that;
};