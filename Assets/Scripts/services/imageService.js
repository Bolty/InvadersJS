"use strict";

var INVADERS = INVADERS || {};
INVADERS.services = INVADERS.services || {};

INVADERS.services.imageService = {

    images: [],

    getImages: function (callback) {

        var config = {
            imageNames: ["Ship", "AlienA", "Explosion1", "Explosion2", "Explosion3", "Bullet", "Star"],
            images: {},
            imageCount: 0
        };

        var loadImage = function (imgName, config, callback) {
            config.images[imgName] = new Image();
            config.images[imgName].src = "Assets/Images/" + imgName + ".gif";
            config.images[imgName].onload = function () {
                config.imageCount++;
                if (config.imageNames.length === config.imageCount) {
                    INVADERS.services.imageService.images = config.images;
                    callback(config.images);
                }
            };
        };

        for (var i = 0; i < config.imageNames.length; i++) {
            loadImage(config.imageNames[i], config, callback);
        }
    }
};