APP.controller('aboutController', ['$rootScope', function ($rootScope) {
    var $this = this;
    //We dont need Content-Loading animation here

    $this.activeMenu = 'about'; //Set active page on Left Panel as DOCS
    window.loaded = true;
    //Toggle Left Panel Mini-Mode
    $this.toggleNavMini = function () {
        $rootScope.compactNav = !$rootScope.compactNav;  //Make Navigation Panel FULL, $rootScope for shareing netween Views
    }
}]);