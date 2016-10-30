import angular from 'angular';
import angularRoute from 'angular-route';
import client from './modules/client/module';

export const app = angular
    .module('app', [
        angularRoute,
        client.name
    ])

    .config([ '$routeProvider', ($routeProvider) => $routeProvider.otherwise({ redirectTo: '/instruments' }) ]);
