var INVADERS = INVADERS || {};

INVADERS.controller = function () {

    var that = this;

    var gameLoop = function() {
        that.ship.move(that.actions);
        //handleBullits();
        //handleAliens();
        //handleBombs();
        //checkForScreenComplete();

        //if (!gameInPlay) {
        //    clearScreen();
        //    prepareForScreen(screen);
        //    gameInPlay = true;
        //}
        window.requestAnimationFrame(gameLoop);
    };

    var initSheet = function () {
        that.ship = INVADERS.ship({
            canvas: that.canvas,
            image: that.images.Ship
        }).draw();
    };

    var startGame = function (images) {
        INVADERS.services.keyboardService.init();

        that.actions = INVADERS.services.keyboardService.actions;
        that.images = images;
        that.canvas = INVADERS.canvas();
        initSheet();
        gameLoop();
    };

    return {
        startGame: startGame
    }
};

window.onload = function () {
    var controller = INVADERS.controller();
    INVADERS.services.imageService.getImages(controller.startGame);
};