APP.controller('detailsController', ['$scope', '$stateParams', '$rootScope', 'RaceWinnerModel', 'driversService',
    function ($scope, $stateParams, $rootScope, RaceWinnerModel, driversService) {
        $scope.driver = $stateParams['driverId'];
        $scope.season = $stateParams['seasonId'];
        $scope.activeMenu = 'home'; //yes HOME, we as driver page should work ONLY if you have selected driver

        $scope.loaded = true; //Turn on animation by default
        $scope.seasonInfo = []; //setting default value
        
        //Toggle Left Panel Mini-Mode
        $scope.toggleNavMini = function () {
            $rootScope.compactNav = !$rootScope.compactNav; //Make Navigation Panel FULL, $rootScope for shareing netween Views
        }
        
        function loadSeasonInfo(season) {
            $scope.loaded = false;

            driversService.getSeasonWinners(season)
                .then(function (data) {
                    $scope.seasonInfo = data.map(RaceWinnerModel.create); //creating driver models from JSON, saving data but not showing
                    $scope.loaded = true; //turn on loading animation
                });
        }
        
        //Load Season Info
        loadSeasonInfo($scope.season);
    }]);