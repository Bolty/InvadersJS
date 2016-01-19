var INVADERS = INVADERS || {};

INVADERS.ship = function (spec) {

    // Init
    spec.x = 500;
    spec.y = 800;

    var that = INVADERS.sprite(spec);

    that.move = function (actions) {
        var deltaX = 0;

        if (actions.leftDown) { deltaX = -5; }
        if (actions.rightDown) { deltaX = 5; }

        that.draw(deltaX, 0);
        return that;
    };

    return that;
};