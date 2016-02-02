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
            fireButtonLeft = document.getElementById("fireButtonLeft"),
            fireButtonRight = document.getElementById("fireButtonRight"),
            leftButton = document.getElementById("leftButton"),
            rightButton = document.getElementById("rightButton");

        var applyTouchAction = function(action, val, e) {
            that.actions[action] = val;
            e.preventDefault();
            return false;
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

        leftButton.addEventListener('touchstart', function (e) {
            applyTouchAction('leftDown', true, e);
        });

        leftButton.addEventListener('touchend', function (e) {
            applyTouchAction('leftDown', false, e);
        });

        rightButton.addEventListener('touchstart', function (e) {
            applyTouchAction('rightDown', true, e);
        });

        rightButton.addEventListener('touchend', function (e) {
            applyTouchAction('rightDown', false, e);
        });

        fireButtonLeft.addEventListener('touchstart', function (e) {
            applyTouchAction('fire', true, e);
        });
        fireButtonRight.addEventListener('touchstart', function (e) {
            applyTouchAction('fire', true, e);
        });
    }
};