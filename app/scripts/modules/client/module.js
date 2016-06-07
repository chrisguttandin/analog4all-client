import { ClientController } from './controllers/client';
import angular from 'angular';
import browser from '../browser/module';
import { client } from './components/client';
import registry from '../registry/module';
import slot from '../slot/module';

export default angular
    .module('client', [
        browser.name,
        registry.name,
        slot.name
    ])

    .component('client', client)

    .controller('ClientController', [ 'browserService', ClientController ]);
