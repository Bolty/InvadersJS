var INVADERS = INVADERS || {};
INVADERS.services = INVADERS.services || {};

INVADERS.services.keyboardService = {

    actions: {
        leftDown: false,
        rightDown: false,
        fire: false
    },

    init: function () {

        var that = this;

        var keyDown = function(evt) {
            switch (evt.keyCode) {
                case 37: // Left arrow
                    that.actions.leftDown = true;
                    break;

                case 39: // Right arrow
                    that.actions.rightDown = true;
                    break;

                case 32: // Space bar
                    that.actions.fire = true;
            }
        };

        var keyUp = function keyUp(evt) {
            switch (evt.keyCode) {
                case 37: // Left arrow
                    that.actions.leftDown = false;
                    break;

                case 39: // Right arrow
                    that.actions.rightDown = false;
                    break;
            }
        };

        window.addEventListener('keydown', keyDown, true);
        window.addEventListener('keyup', keyUp, true);
    }
};