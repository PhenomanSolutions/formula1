var DONT_CHACHE = (+new Date());
var APP = angular.module('APP',
    [
        'angular-page-loader', 'angular-loading-bar', 'ngMaterial', 'ngRoute', 'ui.router', 'ngAnimate',
        'cfp.loadingBar', 'ngSanitize'
    ])
    .constant('API_INFO',
    {
        url: 'http://ergast.com/api/f1/',
        winnersUrl: 'http://ergast.com/api/f1/driverStandings/1.json?offset={0}&limit={1}',
        roundWinners: 'http://ergast.com/api/f1/{0}/results/1.json'
    })
    .config([
        '$sceDelegateProvider', '$httpProvider', 'API_INFO', function ($sceDelegateProvider, $httpProvider, API_INFO) {
            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self', '/',
                // Allow JSONP calls that match this pattern
                API_INFO.url + '**.json**'
            ]);

            $httpProvider.useApplyAsync(true);
        }
    ])
    .config([
        'cfpLoadingBarProvider', '$mdThemingProvider', function (cfpLoadingBarProvider, $mdThemingProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.includeBar = true;

            $mdThemingProvider
                .theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('red');
        }
    ]);
