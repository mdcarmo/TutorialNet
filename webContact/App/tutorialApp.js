//use 'strict';
var tutorialApp = angular.module('tutorialApp', ['ngRoute', 'ngResource',
                                                 'ui.bootstrap','chieffancypants.loadingBar',
                                                 'ngAnimate','toaster']);
tutorialApp.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    }
});