var INVADERS = INVADERS || {};
INVADERS.services = INVADERS.services || {};

INVADERS.services.imageService = {

    imageNames: ["Ship", "AlienA"],
    images: {},
    imageCount: 0,

    loadImage: function (imgName, callback) {
        var that = this;
        this.images[imgName] = new Image();
        this.images[imgName].src = "Assets/Images/" + imgName + ".gif";
        this.images[imgName].onload = function () {
            that.imageCount++;
            if (that.imageNames.length === that.imageCount) {
                callback(that.images);
            }
        };
    },

    getImages: function (callback) {
        for (i = 0; i < this.imageNames.length; i++) {
            this.loadImage(this.imageNames[i], callback);
        }
    }
};