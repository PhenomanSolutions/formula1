APP.run(['$rootScope', '$timeout', '$mdMedia', function ($rootScope, $timeout, $mdMedia) {
    $rootScope.appTitle = "Dashboard";
    $rootScope.isLoading = true;
    $rootScope.compactNav = false; //Make Navigation Panel FULL at the begining, $rootScope for shareing netween Views
    $rootScope.driversData = [];

    $rootScope.$watch(function () { return $mdMedia('xs') || $mdMedia('sm'); }, function (val) {
        $rootScope.compactNav = val;
    });

    //TODO: remove this lines for final product
    window.loaded = true;
    $rootScope.isLoading = false;

    $timeout(function () {
        checkPageReady($timeout, $rootScope, function () {
            return !!jQuery & !!window.loaded;
        });
    }, 1000);
}]);

function checkPageReady($timeout, $rootScope, readyFn) {
    if (readyFn()) {
        $rootScope.isLoading = false;
    } else {
        $timeout(function () {
            checkPageReady($timeout, $rootScope, readyFn);
        }, 500);
    }
}