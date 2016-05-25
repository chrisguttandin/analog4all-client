var fs = require('fs');

module.exports = function () {
    return {
        bindToController: true,
        controller: 'SlotController',
        controllerAs: 'slot',
        require: [
            'instrument'
        ],
        restrict: 'E',
        scope: {
            instrument: '='
        },
        template: fs.readFileSync(__dirname + '/../views/slot.html', 'utf8')
    };
};
