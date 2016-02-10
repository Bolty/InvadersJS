"use strict";

var INVADERS = INVADERS || {};
INVADERS.services = INVADERS.services || {};

INVADERS.services.soundService = {

    playSound: function (soundName) {
        if (!(/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
            var sound = new Audio("Assets/Sounds/" + soundName + ".mp3")
            sound.play();
        }
    }
};