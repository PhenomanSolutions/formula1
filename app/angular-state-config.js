APP.config([
    '$urlRouterProvider', '$locationProvider', '$stateProvider',
    function ($urlRouterProvider, $locationProvider, $stateProvider) {
        $locationProvider.html5Mode(false).hashPrefix('');
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home',
            {
                url: '/home',
                views: {
                    main: {
                        templateUrl: '/templates/_layout.html?_=' + DONT_CHACHE,
                        controller: 'homeController'
                    },
                    'header@home': {
                        templateUrl: '/templates/home/header.html?_=' + DONT_CHACHE
                    },
                    'content@home': {
                        templateUrl: '/templates/home/winnersList.html?_=' + DONT_CHACHE
                    },
                    'leftbar@home': {
                        templateUrl: '/templates/shared/leftMenu.html?_=' + DONT_CHACHE
                    }
                }
            })
            .state('details',
            {
                url: '/details?:driverId&:seasonId',
                views: {
                    main: {
                        templateUrl: '/templates/_layout.html?_=' + DONT_CHACHE,
                        controller: 'detailsController'
                    },
                    'header@details': {
                        templateUrl: '/templates/shared/header.html?_=' + DONT_CHACHE
                    },
                    'content@details': {
                        templateUrl: '/templates/details/detailsPage.html?_=' + DONT_CHACHE
                    },
                    'leftbar@details': {
                        templateUrl: '/templates/shared/leftMenu.html?_=' + DONT_CHACHE
                    }
                }
            })
            .state('about',
            {
                url: '/about',
                views: {
                    main: {
                        templateUrl: '/templates/_layout.html?_=' + DONT_CHACHE,
                        controller: 'aboutController'
                    },
                    'header@about': {
                        templateUrl: '/templates/shared/header.html?_=' + DONT_CHACHE
                    },
                    'content@about': {
                        templateUrl: '/templates/about/aboutPage.html?_=' + DONT_CHACHE
                    },
                    'leftbar@about': {
                        templateUrl: '/templates/shared/leftMenu.html?_=' + DONT_CHACHE
                    }
                }
            });
    }
]);