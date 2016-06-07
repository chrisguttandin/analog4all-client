var angular = require('angular'),
    dropped = require('../dropped/module.js'),
    fileInput = require('./components/file-input.js'),
    FileInputController = require('./controllers/file-input.js');

module.exports = angular
    .module('fileInput', [
        dropped.name
    ])

    .component('fileInput', fileInput)

    .controller('FileInputController', [ '$scope', FileInputController ]);
