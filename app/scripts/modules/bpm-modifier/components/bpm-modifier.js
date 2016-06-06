var fs = require('fs');

module.exports = {
    bindings: {
        json: '<',
        onChange: '&'
    },
    controller: 'BpmModifierController as vm',
    template: fs.readFileSync(__dirname + '/../views/bpm-modifier.html', 'utf8')
};
