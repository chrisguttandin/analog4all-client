import { RegistryController } from './controllers/registry';
import angular from 'angular';
import angularRoute from 'angular-route';
import instruments from '../instruments/module';
import { registry } from './routes/registry';

export default angular
    .module('registry', [
        angularRoute,
        instruments.name
    ])

    .config([ '$routeProvider', ($routeProvider) => $routeProvider.when('/instruments', registry) ])

    .controller('RegistryController', [ 'instruments', 'instrumentsService', '$scope', RegistryController ]);
