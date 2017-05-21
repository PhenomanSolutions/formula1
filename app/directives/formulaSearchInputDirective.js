APP.directive('formulaSearchInput', [function () {

    var tpl = '<input type="text" class="search-input" value="{{ngModel.trim()}}" placeholder="SEARCH"/>';

    return {
        restrict: 'EA',
        template: tpl,
        transclude: true,
        link: function (scope, element, attrs, ctrl, transclude) {
            
            transclude(scope, function (clone, scope) {
                element.append(clone);
            });

            //Update model value
            function updateValue() {
                var input = element.find('input');
                if (input && scope['ngModel']) {
                    scope['ngModel'] = input.val() || ' ';
                }
            }

            //Cheking for theme class, if there is no theme then setting default
            if (!attrs.ui) { attrs.ui = 'default'; }
            //applying THEME class
            element.addClass(attrs.ui);

            //Aplying listener to changes
            element.bind('blur keyup change', function () {
                scope.$apply(updateValue);
            });
        },
        scope: {
            ngModel: '=', //using ngModel 2 way binding
            ui: '@ui' //theme name
        }
    };
}]);