'use strict';

function inject ($parse) {

    return function compile (element, attrs) {
        var fn = $parse(attrs.dragenter, null, true);

        return function link (scope, element) {
            element.on('dragenter', function (event) {
                event.preventDefault();

                scope.$evalAsync(function() {
                    fn(scope);
                });
            });
        };
    };
}

module.exports = function ($parse) {
    return {
        compile: inject($parse),
        restrict: 'A'
    };
};
