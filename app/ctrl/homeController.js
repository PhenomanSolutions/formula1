APP.controller('homeController', ['$scope', 'driversService', 'WinnerModel', '$rootScope', '$timeout', function ($scope, driversService, WinnerModel, $rootScope, $timeout) {
    
    $scope.loaded = false; //Turn on animation by default
    $scope.activeMenu = 'home'; //Set active page on Left Panel as HOME
    $scope.search = {
        text: " " //assign some value for $watch to work
    };
    $scope.drivers = []; //*setting default value

    $scope.yearsRange = { //Defining RANGE as task requires, but can be changed to combo or slider as "driversService" is supporting range
        fromYear: 2005,
        toYear: 2015
    };
    
    //Toggle Left Panel Mini-Mode
    $scope.toggleNavMini = function () {
        $rootScope.compactNav = !$rootScope.compactNav; //Make Navigation Panel FULL, $rootScope for shareing netween Views
    }

    $scope.filterValues = function () {
        var txt = $scope.search.text, _txt = txt.toLowerCase();
        $scope.drivers = $rootScope.driversData.filter(function (driver) {
            //SMART SEARCH for YEAR starting and NAME containing
            return ((driver.year + '').indexOf(txt) === 0) || (driver.fullName().toLowerCase().indexOf(_txt) >= 0);
        });
    }

    function toggleLoadingAnimation(status) {
        if (status) {
            $scope.loaded = false;
        } else {
            $timeout(function () { //Defer Loading animation state change to the end of this function, SMOOTH DRAWING
                $scope.loaded = true;
            }, 20);
        }
    }
    
    function loadDriversList(fromYear, toYear) { //making reusable loafing function with correct animation
        toggleLoadingAnimation(true); //turn on loading animation

        driversService.getWinnersList(fromYear, toYear)
            .then(function (data) {
                $rootScope.driversData = data.map(WinnerModel.create); //creating driver models from JSON, saving data but not showing
                //will show data ONLY after filter
                $scope.filterValues(); //filtering values corresponding to SEARCH text
                toggleLoadingAnimation(false); //turn on loading animation
            });
    }

    //history can't be changed :D so data is static we can chache it
    if ($rootScope.driversData.length) {
        $scope.filterValues();
        toggleLoadingAnimation(false);
    } else {
        //loading drivers list
        loadDriversList($scope.yearsRange.fromYear, $scope.yearsRange.toYear);
    }

    $scope.$watch('search.text', $scope.filterValues);
}]);