var fs = require('fs');

export const registry = {
    controller: 'RegistryController as vm',
    resolve: {
        instruments: [ 'instrumentsService', (instrumentsService) => instrumentsService
            .fetch()
            .then((instruments) => instruments.filter((instrument) => instrument.isAvailable)) ]
    },
    template: fs.readFileSync(__dirname + '/../views/registry.html', 'utf8')
};
