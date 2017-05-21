APP.directive('winLoading',
    function () {

        return {
            restrict: 'EA',
            templateUrl: '/templates/components/winLoading.html?_=' + DONT_CHACHE,
            replace: true
        };
    });