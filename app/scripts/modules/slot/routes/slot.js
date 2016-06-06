var fs = require('fs');

module.exports = {
    controller: 'SlotController as vm',
    resolve: {
        instrument: [ 'instrumentsService', '$route', (instrumentsService, $route) => instrumentsService
            .get($route.current.params.instrumentId) ]
    },
    template: fs.readFileSync(__dirname + '/../views/slot.html', 'utf8')
};
