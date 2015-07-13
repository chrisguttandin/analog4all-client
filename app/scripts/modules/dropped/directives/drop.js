'use strict';'use strict';

function inject ($parse) {

    return function compile (element, attrs) {
        var fn = $parse(attrs.drop, null, true);

        return function link (scope, element) {

            // this is necessary to prevent the default behavior
            element.on('dragover', function (event) {
                event.preventDefault();
            });

            element.on('drop', function (event) {
                event.preventDefault();

                if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
                    // this is necessary (at least in Chrome) to keep a reference to the file until
                    // Angular actually evaluates the expression
                    let file = event.dataTransfer.files[0];

                    scope.$evalAsync(function() {
                        fn(scope, {
                            file: file
                        });
                    });
                }
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
