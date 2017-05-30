APP.controller('homeController', ['$scope', 'driversService', 'WinnerModel', '$rootScope', '$timeout',
    function ($scope, driversService, WinnerModel, $rootScope, $timeout) {
        var $this = this;

        $this.loaded = false; //Turn on animation by default
        $this.activeMenu = 'home'; //Set active page on Left Panel as HOME

        $this.searchText = " "; //assign some value for $watch to work

        $this.drivers = []; //*setting default value

        $this.yearsRange = { //Defining RANGE as task requires, but can be changed to combo or slider as "driversService" is supporting range
            fromYear: 2005,
            toYear: 2015
        };

        //Toggle Left Panel Mini-Mode
        $this.toggleNavMini = function () {
            $rootScope.compactNav = !$rootScope.compactNav; //Make Navigation Panel FULL, $rootScope for shareing netween Views
        }

        $this.filterValues = function () {
            var txt = $this.searchText, _txt = txt.toLowerCase();
            $this.drivers = $rootScope.driversData.filter(function (driver) {
                //SMART SEARCH for YEAR starting and NAME containing
                return ((driver.year + '').indexOf(txt) === 0) || (driver.fullName().toLowerCase().indexOf(_txt) >= 0);
            });
        }

        function toggleLoadingAnimation(status) {
            if (status) {
                $this.loaded = false;
            } else {
                $timeout(function () { //Defer Loading animation state change to the end of this function, SMOOTH DRAWING
                    $this.loaded = true;
                }, 20);
            }
        }

        function loadDriversList(fromYear, toYear) { //making reusable loafing function with correct animation
            toggleLoadingAnimation(true); //turn on loading animation

            window.loaded = true;
            driversService.getWinnersList(fromYear, toYear)
                .then(function (data) {
                    $rootScope.driversData = data.map(WinnerModel.create); //creating driver models from JSON, saving data but not showing
                    //will show data ONLY after filter
                    $this.filterValues(); //filtering values corresponding to SEARCH text
                    toggleLoadingAnimation(false); //turn on loading animation
                });
        }

        //history can't be changed :D so data is static we can chache it
        if ($rootScope.driversData.length) {
            $this.filterValues();
            toggleLoadingAnimation(false);
        } else {
            //loading drivers list
            loadDriversList($this.yearsRange.fromYear, $this.yearsRange.toYear);
        }
        
        var cancelHandler = $scope.$watch(function() {
            return $this.searchText;
        }, $this.filterValues);

        $scope.$on("$destroy", function () {
            cancelHandler();
        });
    }]);