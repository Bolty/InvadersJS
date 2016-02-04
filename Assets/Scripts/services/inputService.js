"use strict";

var INVADERS = INVADERS || {};
INVADERS.services = INVADERS.services || {};

INVADERS.services.inputService = {

    actions: {
        leftDown: false,
        rightDown: false,
        fire: false
    },

    init: function () {

        var that = this,
            fireButton = document.getElementById("fireButton"),
            leftButton = document.getElementById("leftButton"),
            rightButton = document.getElementById("rightButton");

        var applyTouchActionListener = function (button, touchType, action, val) {
            button.addEventListener(touchType, function (e) {
                that.actions[action] = val;
                e.preventDefault();
                return false;
            });
        }

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
        applyTouchActionListener(leftButton, 'touchstart', 'leftDown', true);
        applyTouchActionListener(leftButton, 'touchend', 'leftDown', false);
        applyTouchActionListener(rightButton, 'touchstart', 'rightDown', true);
        applyTouchActionListener(rightButton, 'touchend', 'rightDown', false);
        applyTouchActionListener(fireButton, 'touchstart', 'fire', true);
    }
};