"use strict";

var INVADERS = INVADERS || {};
INVADERS.services = INVADERS.services || {};

INVADERS.services.arrayService = {

    filter: function (array, property, value, filterType) {
        var result = [];

        var getPropertyValue = function (element, property) {
            if (Object.prototype.toString.call(array[i][property]) == '[object Function]') {
                return element[property]();
            } else return array[i][property];
        };

        for (var i = 0; i < array.length; i++) {
            var propertyValue = getPropertyValue(array[i], property);
            switch (filterType) {
                case '>':
                    if (propertyValue > value) result.push(array[i]);
                    break;

                case '==':
                    if (propertyValue == value) result.push(array[i]);
                    break;
            }
        }

        return result;
    }
};