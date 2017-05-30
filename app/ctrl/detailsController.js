APP.controller('detailsController', ['$stateParams', '$rootScope', 'RaceWinnerModel', 'driversService',
    function ($stateParams, $rootScope, RaceWinnerModel, driversService) {
        var $this = this;

        $this.driver = $stateParams['driverId'];
        $this.season = $stateParams['seasonId'];
        $this.activeMenu = 'home'; //yes HOME, we as driver page should work ONLY if you have selected driver

        $this.loaded = true; //Turn on animation by default
        $this.seasonInfo = []; //setting default value
        
        //Toggle Left Panel Mini-Mode
        $this.toggleNavMini = function () {
            $rootScope.compactNav = !$rootScope.compactNav; //Make Navigation Panel FULL, $rootScope for shareing netween Views
        }
        
        function loadSeasonInfo(season) {
            $this.loaded = false;
            window.loaded = true;
            driversService.getSeasonWinners(season)
                .then(function (data) {
                    $this.seasonInfo = data.map(RaceWinnerModel.create); //creating driver models from JSON, saving data but not showing
                    $this.loaded = true; //turn on loading animation
                });
        }
        
        //Load Season Info
        loadSeasonInfo($this.season);
    }]);