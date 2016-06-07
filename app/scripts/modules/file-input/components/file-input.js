var fs = require('fs');

export const fileInput = {
    bindings: {
        instrumentName: '<',
        onChange: '&'
    },
    controller: 'FileInputController as vm',
    template: fs.readFileSync(__dirname + '/../views/file-input.html', 'utf8')
};
