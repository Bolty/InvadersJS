var INVADERS = INVADERS || {};

INVADERS.controller = function () {

    var startGame = function (images) {
        var canvas = INVADERS.canvas();
        var ship = INVADERS.ship(canvas, images.Ship);

        ship.draw();
    };

    return {
        startGame: startGame
    }
};

window.onload = function () {
    var controller = INVADERS.controller();
    INVADERS.services.imageService.getImages(controller.startGame);
    
};