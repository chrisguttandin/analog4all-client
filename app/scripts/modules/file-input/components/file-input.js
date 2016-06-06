var fs = require('fs');

module.exports = {
    bindings: {
        instrumentName: '<',
        onChange: '&'
    },
    controller: 'FileInputController as vm',
    template: fs.readFileSync(__dirname + '/../views/file-input.html', 'utf8')
};
