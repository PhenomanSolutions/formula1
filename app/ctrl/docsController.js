﻿APP.controller('docsController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    //We dont need Content-Loading animation here
    
    $scope.activeMenu = 'docs'; //Set active page on Left Panel as DOCS
    
    //Toggle Left Panel Mini-Mode
    $scope.toggleNavMini = function () {
        $rootScope.compactNav = !$rootScope.compactNav;  //Make Navigation Panel FULL, $rootScope for shareing netween Views
    }
}]);