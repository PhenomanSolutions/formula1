APP.directive('menuLink',
    function () {
        return {
            restrict: 'EA',
            templateUrl: '/templates/components/menuLink.html?_=' + DONT_CHACHE,
            link: function (scope, element, attrs) {
                //Cheking for theme class, if there is no theme then setting default
                if (!attrs.ui) { attrs.ui = 'default'; }
                //applying THEME class
                element.addClass(attrs.ui);

                if (attrs.sref || attrs.click) {
                    scope.mode = attrs.sref ? 'sref-mode' : 'click-mode'; //switching between CLICK handlers
                } else {
                    scope.mode = 'none';
                }
            },
            scope: {
                text: '@text',
                iconCls: '@iconCls',
                active: '=active',
                compact: '=compact', //show only icons
                sref: '@sref', //handling SREF navigation
                click: '@click', //handling OnClick
                ui: '@ui' //theme name
            }
        };
    });