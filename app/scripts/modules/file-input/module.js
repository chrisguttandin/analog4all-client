var angular = require('angular'),
    fileInput = require('./components/file-input.js'),
    FileInputController = require('./controllers/file-input.js');

module.exports = angular
    .module('fileInput', [])

    .component('fileInput', fileInput)

    .controller('FileInputController', [ '$scope', FileInputController ]);
