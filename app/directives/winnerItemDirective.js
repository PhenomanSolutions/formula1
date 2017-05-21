APP.directive('winnerItem',
    function () {

        return {
            restrict: 'EA',
            templateUrl: '/templates/components/winnerItem.html?_=' + DONT_CHACHE,
            replace: true,
            compile: function (element, attrs) {
                //Cheking for theme class, if there is no theme then setting default
                if (!attrs.ui) { attrs.ui = 'default'; }
                //applying THEME class
                element.addClass(attrs.ui);
            },
            scope: {
                itemData: '=itemData',
                ui: '@ui' //theme name
            }
        };
    });